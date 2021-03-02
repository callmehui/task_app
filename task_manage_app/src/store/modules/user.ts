import { UserInfo } from "@/views/login/interface";

/** user state接口 */
interface UserState {
  userInfo: UserInfo
}

const userModule = {
  namespaced: true,
  state: () => ({
    userInfo: {} as UserInfo,
  }),
  getters: {
    /** vue3.1版本发布前，仍旧有问题 */
  },
  mutations: {
    setUserInfo(state: UserState, userInfo: UserInfo) {
      state.userInfo = userInfo;
    },
  },
};

export { UserState, userModule };
