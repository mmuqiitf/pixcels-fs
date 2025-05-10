import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import App from "./app.vue";
import MovieList from "./MovieList.vue";
import MovieDetail from "./MovieDetail.vue";

// Use VueRouter
Vue.use(VueRouter);

// Define routes
const routes: RouteConfig[] = [
	{ path: "/", component: MovieList },
	{ path: "/movie/:id", component: MovieDetail },
];

// Create router instance
const router = new VueRouter({
	mode: "history",
	routes,
});

new Vue({
	el: "#app",
	router,
	render: (h) => h(App),
});
