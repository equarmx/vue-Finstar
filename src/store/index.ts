import Vue from "vue";
import Vuex from "vuex";

import { getTodos } from "@/services/request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      message: "",
      show: false,
    },
    loadingList: false,
    listUsers: [],
  },
  mutations: {
    changeNotification(state, data) {
      state.notification.show = true;
      state.notification.message = data;
    },
    changeLoadingList(state, value) {
      state.loadingList = value;
    },
    changeListUsers(state, array) {
      state.listUsers = array;
    },
  },
  actions: {
    async getListTodos({ commit }) {
      commit("changeLoadingList", true);
      const result = await getTodos("todos");
      commit("changeLoadingList", false);
      return result;
    },
  },
  modules: {},
});
