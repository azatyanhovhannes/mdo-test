import "./plugins/axios";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";
import VueTheMask from "vue-the-mask";
import "./assets/fonts/fonts.scss";
import moment from "moment";

Vue.use(VueTheMask);

Vue.use(VueCompositionApi);


Vue.config.productionTip = false;

Vue.prototype.$moment = moment;

declare module "vue/types/vue" {
	interface Vue {
		$moment: typeof moment;
	}
}

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
