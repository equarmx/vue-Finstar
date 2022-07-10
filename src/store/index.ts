import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      message: "",
      show: false,
    },
    loadingList: false,
  },
  mutations: {
    changeNotification(state, data) {
      state.notification.show = true;
      state.notification.message = data;
    },
    changeLoadingList(state, value) {
      state.loadingList = value;
    },
  },
  actions: {},
  modules: {},
});
