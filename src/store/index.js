import { createStore } from "vuex";
import axiosConfig from "@/includes/axiosConfig";

export default createStore({
  state: {
    toggleAuthModal: false,
    authenticated: false,
    user: null,
    token: localStorage.getItem("ss-token") || null,
    allRoles: null,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ss-token")}`,
      },
    },
  },
  mutations: {
    toggleAuthModalMutation(state) {
      state.toggleAuthModal = !state.toggleAuthModal;
    },
    setAuthenticated(state, data) {
      state.user = data["user"];
      if (data["token"] != null) {
        localStorage.setItem("ss-token", data["token"]);
        state.token = localStorage.getItem("ss-token");
        state.config.headers.Authorization = "Bearer " + data["token"];
      }
      state.authenticated = true;
    },
    setUnAuthenticated(state) {
      state.user = null;
      localStorage.removeItem("ss-token");
      state.token = null;
      state.authenticated = false;
    },
    setAllRoles(state, roles) {
      state.allRoles = roles;
    },
  },
  actions: {
    toggleAuthModalAction({ commit }) {
      commit("toggleAuthModalMutation");
    },
    axiosPost(state, val = null) {
      return axiosConfig.post(val.url, val, state.config);
    },
    async checkAuthenticated({ commit }) {
      /* here it's not necessary to pass the token because it will be saved in the localstorage when the page is refreshed */
      await axiosConfig
        .get("user")
        .then((response) => {
          console.log(response.data);
          let data = [];
          data["user"] = response.data.userCred;
          commit("setAuthenticated", data);
        })
        .catch(() => {
          return;
        });
    },
    async getAllRole({ state, commit }) {
      console.log(state.config);
      await axiosConfig.get("roles", state.config).then((res) => {
        commit("setAllRoles", res.data.info);
      });
    },
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
    config(state) {
      return state.config;
    },
    allRoles(state) {
      return state.allRoles;
    },
  },
  modules: {},
});
