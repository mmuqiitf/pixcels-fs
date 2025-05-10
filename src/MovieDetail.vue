<template>
	<div class="movie-detail">
		<div v-if="movie.id" class="movie-content">
			<h1>{{ movie.title }}</h1>
			<p class="tagline">{{ movie.tagline }}</p>
			<div class="movie-meta">
				<p>
					<strong>Release Date:</strong> {{ formatDate(movie.release_date) }}
				</p>
				<p><strong>Runtime:</strong> {{ movie.runtime }} minutes</p>
				<p><strong>Rating:</strong> {{ movie.vote_average }}/10</p>
			</div>
			<div class="movie-overview">
				<h3>Overview</h3>
				<p>{{ movie.overview }}</p>
			</div>
			<button @click="goBack" class="back-button">Back to Movies</button>
		</div>
		<div v-else class="loading">Loading movie details...</div>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
			movie: {},
		};
	},
	created: function () {
		var movieId = this.$route.params.id;
		fetch("/api/movies/" + movieId)
			.then(function (response) {
				return response.json();
			})
			.then(
				function (data) {
					this.movie = data;
				}.bind(this)
			);
	},
	methods: {
		formatDate: function (dateString) {
			if (!dateString) return "";
			return new Date(dateString).toLocaleDateString();
		},
		goBack: function () {
			this.$router.push("/");
		},
	},
};
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
}

.movie-overview {
	margin: 25px 0;
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

@media (max-width: 600px) {
	.movie-meta {
		grid-template-columns: 1fr;
	}
}
</style>
