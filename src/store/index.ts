import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: null as string | null,
		data: []
	},
	getters: {
    getToken: (state) => state.token,
		getData: (state) => state.data,
  },
	mutations: {
		setToken(state, token: string) {
			state.token = token;
		},
		setData(state, data: any[]) {
			state.data = [...data];
		},
	},
	actions: {
		saveToken({ commit }, token: string) {
			commit("setToken", token);
		},
		saveData({ commit }, data: any[]) {
			commit("setData", data);
		},
	},
});
