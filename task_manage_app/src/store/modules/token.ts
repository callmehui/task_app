/** user state接口 */
interface TokenState {
  token: string /** 当前用户的jwt */;
}

const tokenModule = {
  namespaced: true,
  state: () => ({
    token: String,
  }),
  getters: {
    /** vue3.1版本发布前，仍旧有问题 */
  },
  mutations: {
    setToken(state: TokenState, token: string) {
      state.token = token;
    },
  },
};

export { TokenState, tokenModule };
