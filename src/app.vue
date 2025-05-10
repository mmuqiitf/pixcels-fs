<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
	name: "App",
})
export default class App extends Vue {}
</script>

<style>
body {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
}
</style>
