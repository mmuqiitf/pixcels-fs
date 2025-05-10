<template>
	<div>
		<h1>Movies</h1>
		<div class="movie-list">
			<div
				v-for="movie in movies"
				:key="movie.id"
				class="movie-item"
				@click="viewMovie(movie.id)"
			>
				<h2>{{ movie.title }}</h2>
				<p class="tagline">{{ movie.tagline }}</p>
				<p class="rating">
					<strong>Rating:</strong> {{ movie.vote_average }}/10
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { MovieListItem } from "./types";

@Component
export default class MovieList extends Vue {
	movies: MovieListItem[] = [];

	created(): void {
		fetch("/api/movies")
			.then((response) => response.json())
			.then((data) => {
				this.movies = data as MovieListItem[];
			});
	}

	viewMovie(id: number): void {
		this.$router.push("/movie/" + id);
	}
}
</script>

<style>
h1 {
	text-align: center;
	margin-bottom: 30px;
}
.movie-list {
	display: grid;
	/* Responsive grid layout - 4 columns on desktop, fewer on smaller screens */
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
	padding: 0 20px;
}
.movie-item {
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 15px;
	cursor: pointer;
	transition: transform 0.2s, box-shadow 0.2s;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	height: 100%;
	display: flex;
	flex-direction: column;
}
.movie-item:hover {
	transform: translateY(-5px);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.tagline {
	color: #666;
	font-style: italic;
	flex-grow: 1;
}
.rating {
	color: #e67e22;
	font-weight: bold;
	margin-top: auto;
}

/* Media queries for responsive design */
@media screen and (max-width: 1200px) {
	.movie-list {
		grid-template-columns: repeat(
			3,
			1fr
		); /* 3 columns on medium-large screens */
	}
}

@media screen and (max-width: 900px) {
	.movie-list {
		grid-template-columns: repeat(2, 1fr); /* 2 columns on medium screens */
	}
}

@media screen and (max-width: 600px) {
	.movie-list {
		grid-template-columns: 1fr; /* 1 column on mobile */
	}
	h1 {
		font-size: 1.8rem;
	}
}
</style>
