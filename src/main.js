var Vue = require("vue");
var VueRouter = require("vue-router");
var App = require("./app.vue");
var MovieList = require("./MovieList.vue");
var MovieDetail = require("./MovieDetail.vue");

// Use VueRouter
Vue.use(VueRouter);

// Define routes
var routes = [
	{ path: "/", component: MovieList },
	{ path: "/movie/:id", component: MovieDetail },
];

// Create router instance
var router = new VueRouter({
	mode: "history",
	routes: routes,
});

new Vue({
	el: "#app",
	router: router,
	render: function (h) {
		return h(App);
	},
});
