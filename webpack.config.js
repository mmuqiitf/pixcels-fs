const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	entry: "./src/main.ts",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "build.js",
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/],
				},
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".vue"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
		},
	},
	devtool: "source-map",
	plugins: [new VueLoaderPlugin()],
};
