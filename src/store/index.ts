import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface IPageItems {
	page: number;
	page_next: number;
	page_previous: number;
	page_size: number;
	pages: number;
}

export default new Vuex.Store({
	state: {
		token: null as string | null,
		data: [],
		count: 0,
		page: null as number | null,
		page_next: null as number | null,
		page_previous: null as number | null,
		page_size: null as number | null,
		pages: null as number | null,
	},
	getters: {
		getToken: state => state.token,
		getData: state => state.data,
		getCount: state => state.count,
		getPage: state => state.page,
		getPageNext: state => state.page_next,
		getNextPrevious: state => state.page_previous,
		getPageSize: state => state.page_size,
		getPages: state => state.pages
	},
	mutations: {
		setToken(state, token: string) {
			state.token = token;
		},
		setData(state, data: any[]) {
			state.data = [...data];
		},
		setCount(state, count: number) {
			state.count = count;
		},
		setPageItems(state, pageItems: IPageItems) {
			state.page = pageItems.page;
			state.page_next = pageItems.page_next;
			state.page_previous = pageItems.page_previous;
			state.page_size = pageItems.page_size;
			state.pages = pageItems.pages;
		}
	},
	actions: {
		saveToken({ commit }, token: string) {
			commit("setToken", token);
		},
		saveData({ commit }, data: any[]) {
			commit("setData", data);
		},
		saveCount({ commit }, count: number) {
			commit("setCount", count);
		},
		savePageItems({ commit }, pageItems: IPageItems) {
			commit("setPageItems", pageItems);
		}
	},
});
