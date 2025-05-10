<template>
	<div class="movie-detail">
		<div v-if="movie.id" class="movie-content">
			<h1>{{ movie.title }}</h1>
			<p class="tagline">{{ movie.tagline }}</p>

			<div class="movie-meta">
				<div class="meta-item">
					<strong>Release Date:</strong> {{ formatDate(movie.release_date) }}
				</div>
				<div class="meta-item">
					<strong>Runtime:</strong> {{ movie.runtime }} minutes
				</div>
				<div class="meta-item">
					<strong>Rating:</strong> {{ movie.vote_average }}/10
				</div>
				<div class="meta-item">
					<strong>Vote Count:</strong> {{ movie.vote_count }}
				</div>
				<div class="meta-item"><strong>Status:</strong> {{ movie.status }}</div>
			</div>

			<div class="movie-details">
				<div class="movie-overview">
					<h3>Overview</h3>
					<p>{{ movie.overview }}</p>
				</div>

				<div class="genres" v-if="movie.genres && movie.genres.length">
					<h3>Genres</h3>
					<ul>
						<li v-for="genre in movie.genres" :key="genre.id">
							{{ genre.name }}
						</li>
					</ul>
				</div>

				<div
					class="production"
					v-if="movie.production_companies && movie.production_companies.length"
				>
					<h3>Production Companies</h3>
					<ul>
						<li v-for="company in movie.production_companies" :key="company.id">
							{{ company.name }}
						</li>
					</ul>
				</div>

				<div
					class="languages"
					v-if="movie.spoken_languages && movie.spoken_languages.length"
				>
					<h3>Spoken Languages</h3>
					<ul>
						<li v-for="lang in movie.spoken_languages" :key="lang.iso_639_1">
							{{ lang.name }}
						</li>
					</ul>
				</div>

				<div class="additional-info">
					<div v-if="movie.homepage">
						<h3>Homepage</h3>
						<a
							:href="movie.homepage"
							target="_blank"
							rel="noopener noreferrer"
							>{{ movie.homepage }}</a
						>
					</div>

					<div v-if="movie.imdb_id">
						<h3>IMDB ID</h3>
						<p>{{ movie.imdb_id }}</p>
					</div>
				</div>
			</div>

			<button @click="goBack" class="back-button">Back to Movies</button>
		</div>
		<div v-else class="loading">Loading movie details...</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Movie } from "./types";

@Component
export default class MovieDetail extends Vue {
	movie: Movie = {} as Movie;

	created(): void {
		const movieId = this.$route.params.id;
		fetch(`/api/movies/${movieId}`)
			.then((response) => response.json())
			.then((data) => {
				this.movie = data;
			});
	}

	formatDate(dateString: string): string {
		if (!dateString) return "N/A";

		// Handle dates in format DD/M/YY (like "19/7/95")
		if (dateString.includes("/")) {
			const parts = dateString.split("/");
			if (parts.length === 3) {
				const day = parseInt(parts[0], 10);
				const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
				let year = parseInt(parts[2], 10);

				// Handle 2-digit years - if year is less than 100, assume it's 19XX for years >= 30, 20XX for years < 30
				if (year < 100) {
					year = year >= 30 ? 1900 + year : 2000 + year;
				}

				const date = new Date(year, month, day);

				// Check if date is valid before formatting
				if (!isNaN(date.getTime())) {
					return date.toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					});
				}
			}
			return dateString; // Return original if parsing failed
		}

		// For standard ISO date format
		const date = new Date(dateString);
		if (!isNaN(date.getTime())) {
			return date.toLocaleDateString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		}

		return dateString; // Return original string if all parsing attempts fail
	}

	formatCurrency(value: number | string): string {
		if (!value) return "N/A";
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	goBack(): void {
		this.$router.push("/");
	}
}
</script>

<style>
.movie-detail {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.movie-content {
	background-color: #f9f9f9;
	border-radius: 8px;
	padding: 25px;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
	margin-bottom: 10px;
	color: #333;
}

h3 {
	margin-top: 20px;
	margin-bottom: 10px;
	color: #444;
	border-bottom: 1px solid #eee;
	padding-bottom: 5px;
}

.tagline {
	font-size: 1.2em;
	font-style: italic;
	color: #666;
	margin-bottom: 20px;
	border-bottom: 1px solid #ddd;
	padding-bottom: 15px;
}

.movie-meta {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 15px;
	margin-bottom: 20px;
	background-color: #f0f0f0;
	padding: 15px;
	border-radius: 6px;
}

.meta-item {
	padding: 8px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.movie-details {
	margin: 25px 0;
}

.movie-overview {
	margin-bottom: 20px;
}

.genres ul,
.production ul,
.languages ul {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	padding-left: 0;
	list-style: none;
}

.genres li,
.production li,
.languages li {
	background-color: #e0e0e0;
	padding: 5px 10px;
	border-radius: 15px;
	font-size: 0.9em;
}

.additional-info {
	margin-top: 20px;
}

.additional-info a {
	color: #3498db;
	word-break: break-all;
}

.back-button {
	background-color: #3498db;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1em;
	transition: background-color 0.3s;
	margin-top: 20px;
}

.back-button:hover {
	background-color: #2980b9;
}

.loading {
	text-align: center;
	font-size: 1.2em;
	padding: 40px;
	color: #666;
}

/* Responsive design for smaller screens */
@media (max-width: 600px) {
	.movie-meta {
		grid-template-columns: 1fr;
	}

	.movie-content {
		padding: 15px;
	}

	h1 {
		font-size: 1.8rem;
	}

	.tagline {
		font-size: 1rem;
	}

	.genres ul,
	.production ul,
	.languages ul {
		flex-direction: column;
		gap: 5px;
	}
}
</style>
