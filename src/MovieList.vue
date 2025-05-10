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
body {
	/* Apply a subtle background to the whole page */
	background-color: #f8f9fa; /* Lighter, more neutral background */
	font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif; /* Modern, minimalist font stack */
	color: #343a40; /* Darker grey for text for better readability */
}

h1 {
	text-align: center;
	margin-top: 40px; /* Add top margin */
	margin-bottom: 50px; /* Increased margin */
	color: #212529; /* Very dark grey, almost black */
	font-weight: 500; /* Lighter font weight for a cleaner look */
	font-size: 2.2rem; /* Slightly reduced font size */
}
.movie-list {
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(280px, 1fr)
	); /* Slightly larger min-width for items */
	gap: 30px; /* Increased gap */
	padding: 0 30px; /* Increased padding */
	max-width: 1400px; /* Max width for the list */
	margin: 0 auto; /* Center the list */
}
.movie-item {
	background-color: #fff;
	border: 1px solid #e9ecef; /* Subtle border */
	border-radius: 8px; /* Slightly less rounded corners */
	padding: 25px; /* Increased padding */
	cursor: pointer;
	transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03); /* Very subtle shadow */
	height: 100%;
	display: flex;
	flex-direction: column;
}
.movie-item:hover {
	transform: translateY(-5px); /* Subtle hover effect */
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06); /* Slightly more pronounced shadow on hover */
}

.movie-item h2 {
	font-size: 1.15rem; /* Slightly smaller title */
	color: #343a40;
	margin-bottom: 10px; /* Increased margin */
	font-weight: 500; /* Lighter title */
}

.tagline {
	color: #6c757d; /* Muted grey for tagline */
	font-style: normal; /* Remove italic */
	flex-grow: 1;
	font-size: 0.85rem;
	margin-bottom: 15px; /* Increased space below tagline */
	line-height: 1.5; /* Improved line height */
}
.rating {
	color: #495057; /* Muted color for rating */
	font-weight: 500; /* Lighter font weight */
	margin-top: auto;
	font-size: 0.9rem;
}

.rating strong {
	font-weight: 500; /* Match font weight */
}

/* Media queries for responsive design */
@media screen and (max-width: 1200px) {
	.movie-list {
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 25px;
		padding: 0 25px;
	}
}

@media screen and (max-width: 900px) {
	.movie-list {
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 20px;
		padding: 0 20px;
	}
	h1 {
		font-size: 2rem;
		margin-bottom: 40px;
	}
}

@media screen and (max-width: 600px) {
	.movie-list {
		grid-template-columns: 1fr; /* 1 column on mobile */
		gap: 20px;
		padding: 0 15px;
	}
	h1 {
		font-size: 1.8rem;
		margin-bottom: 30px;
	}
	.movie-item {
		padding: 20px;
	}
	.movie-item h2 {
		font-size: 1.1rem;
	}
	.tagline {
		font-size: 0.8rem;
	}
	.rating {
		font-size: 0.85rem;
	}
}
</style>
