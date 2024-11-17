import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: null as string | null,
	},
	getters: {
    getToken: (state) => state.token,
  },
	mutations: {
		setToken(state, token: string) {
			state.token = token;
		},
	},
	actions: {
		saveToken({ commit }, token: string) {
			commit("setToken", token);
		},
	},
});
