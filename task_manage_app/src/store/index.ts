import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { menuModule } from "./modules/menu";
import { userModule } from "./modules/user";
import { tokenModule } from "./modules/token";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu: menuModule,
    user: userModule,
    token: tokenModule,
  },
  plugins: [createPersistedState()],
});
