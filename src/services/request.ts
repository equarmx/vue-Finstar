import axios, { AxiosInstance } from "axios";
import store from "../store/";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

interface Todos {
  userId?: number;
  id: number;
  title?: string;
  completed?: boolean;
}
export { Todos };

export const getTodos = async (url: string): Promise<Array<Todos> | string | undefined> => {
  try {
    const { data } = await axiosClient.get(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error.message);
    } else {
      handleUnexpectedError(error.message);
    }
  }
};

function handleAxiosError(error: string): void {
  store.commit("changeNotification", error);
}

function handleUnexpectedError(error: string): void {
  store.commit("changeNotification", error);
}
