import axios, { AxiosInstance } from "axios";
import store from "../store/";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Array<Todos> | string | undefined> => {
  store.commit("changeLoadingList", true);
  try {
    const { data } = await axiosClient.get(`todos`);
    store.commit("changeLoadingList", false);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error.message);
    } else {
      handleUnexpectedError(error.message);
    }
    store.commit("changeLoadingList", false);
  }
};

function handleAxiosError(error: string): void {
  store.commit("changeNotification", error);
}

function handleUnexpectedError(error: string): void {
  store.commit("changeNotification", error);
}
