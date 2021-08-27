import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "@/axios";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "housesin",
  reducer: state => {
    return { token: state.token, user: state.user };
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],

  state: {
    user: {},
    token: "",
    snackbar: {
      text: "",
      type: "",
      isShow: false
    }
  },

  getters: {
    getToken: state => state.token
  },

  mutations: {
    SNACKBAR: (state, snackbar) => {
      state.snackbar.text = snackbar.text;
      state.snackbar.type = snackbar.type;
      state.snackbar.isShow = snackbar.isShow;
    },
    USER_UPDATE: (state, user) => {
      state.user = user;
    },
    TOKEN_SAVE: (state, token) => {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      state.token = token;
    },
    TOKEN_DELETE: state => {
      delete axios.defaults.headers.Authorization;
      state.token = "";
    }
  },

  actions: {
    updateUser: (ctx, user) => {
      ctx.commit("USER_UPDATE", user);
    },
    guardarToken: (ctx, token) => {
      ctx.commit("TOKEN_SAVE", token);
    },
    borrarToken: ctx => {
      ctx.commit("TOKEN_DELETE");
    }
  },

  modules: {}
});

