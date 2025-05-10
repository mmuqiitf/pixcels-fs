<template>
	<div class="movie-detail-page">
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

			<div class="movie-main-details">
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
					<div v-if="movie.homepage" class="info-block">
						<h3>Homepage</h3>
						<a
							:href="movie.homepage"
							target="_blank"
							rel="noopener noreferrer"
							>{{ movie.homepage }}</a
						>
					</div>

					<div v-if="movie.imdb_id" class="info-block">
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
/* General body styles for consistent background and font */
body {
	background-color: #f8f9fa; /* Light, neutral background */
	font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif; /* Modern, minimalist font stack */
	color: #343a40; /* Darker grey for text */
}

.movie-detail-page {
	max-width: 800px; /* Slightly reduced max-width for a more focused view */
	margin: 30px auto; /* Adjusted margin */
	padding: 25px; /* Adjusted padding */
	background-color: #ffffff;
	border-radius: 8px; /* Subtle rounding */
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Softer shadow */
}

.movie-content h1 {
	font-size: 2.2rem; /* Slightly reduced title size */
	margin-bottom: 10px;
	color: #212529; /* Very dark grey */
	font-weight: 500; /* Lighter font weight */
	text-align: center;
}

.tagline {
	font-size: 1.1em;
	font-style: normal; /* Removed italic for a cleaner look */
	color: #6c757d; /* Muted grey */
	margin-bottom: 25px;
	text-align: center;
	padding-bottom: 15px;
	border-bottom: 1px solid #e9ecef; /* Lighter border */
}

.movie-meta {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 15px; /* Reduced gap */
	margin-bottom: 25px;
	padding: 15px; /* Reduced padding */
	background-color: #f8f9fa; /* Light background for meta section */
	border-radius: 6px;
}

.meta-item {
	padding: 10px;
	background-color: #fff;
	border: 1px solid #e9ecef; /* Subtle border */
	border-radius: 4px;
	font-size: 0.9rem; /* Slightly smaller font */
}

.meta-item strong {
	color: #343a40;
	font-weight: 500; /* Lighter strong weight */
}

.movie-main-details h3 {
	font-size: 1.2rem; /* Reduced section title size */
	color: #343a40;
	margin-top: 25px;
	margin-bottom: 12px;
	border-bottom: 1px solid #dee2e6; /* Lighter accent border */
	padding-bottom: 6px;
	font-weight: 500;
}

.movie-overview p {
	font-size: 1rem; /* Standardized overview text size */
	line-height: 1.6; /* Improved line spacing */
	color: #495057; /* Slightly lighter text color */
}

.genres ul,
.production ul,
.languages ul {
	display: flex;
	flex-wrap: wrap;
	gap: 8px; /* Reduced gap */
	padding-left: 0;
	list-style: none;
}

.genres li,
.production li,
.languages li {
	background-color: #e9ecef; /* Lighter background for list items */
	color: #343a40;
	padding: 6px 12px; /* Adjusted padding */
	border-radius: 4px; /* Less rounded */
	font-size: 0.85em;
}

.additional-info {
	margin-top: 25px;
	padding-top: 15px;
	border-top: 1px solid #e9ecef; /* Lighter separator */
}

.info-block {
	/* Added class for consistent spacing */
	margin-bottom: 12px;
}

.additional-info h3 {
	border-bottom: none;
	margin-bottom: 6px;
	font-size: 1.1rem; /* Slightly smaller */
}

.additional-info a {
	color: #007bff; /* Standard blue for links */
	word-break: break-all;
	text-decoration: none;
}

.additional-info a:hover {
	text-decoration: underline;
}

.back-button {
	display: block;
	margin: 30px auto 0;
	background-color: #007bff; /* Standard blue */
	color: white;
	border: none;
	padding: 10px 20px; /* Adjusted padding */
	border-radius: 4px;
	cursor: pointer;
	font-size: 1em;
	transition: background-color 0.2s ease;
}

.back-button:hover {
	background-color: #0056b3; /* Darker blue on hover */
}

.loading {
	text-align: center;
	font-size: 1.1em; /* Slightly smaller loading text */
	padding: 40px;
	color: #6c757d;
}

/* Responsive design adjustments */
@media (max-width: 768px) {
	.movie-detail-page {
		margin: 15px;
		padding: 15px;
	}

	.movie-content h1 {
		font-size: 1.8rem;
	}

	.tagline {
		font-size: 1em;
	}

	.movie-meta {
		grid-template-columns: 1fr; /* Stack meta items */
	}

	.movie-main-details h3 {
		font-size: 1.1rem;
	}
}

@media (max-width: 480px) {
	.movie-content h1 {
		font-size: 1.6rem;
	}

	.tagline {
		font-size: 0.9em;
	}

	.back-button {
		padding: 8px 15px;
		font-size: 0.9em;
	}

	.meta-item {
		font-size: 0.85rem;
	}

	.movie-overview p {
		font-size: 0.95rem;
	}
}
</style>
