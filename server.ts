import express from "express";
import * as fs from "fs";
import * as path from "path";
import { Movie, MovieListItem } from "./src/types";

const app = express();

// Load movies data
const moviesData: Movie[] = JSON.parse(
	fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf-8")
);

app.use(express.static("public"));

// API to list movies
app.get("/api/movies", (req, res) => {
	const movies: MovieListItem[] = moviesData.map((movie) => {
		return {
			id: movie.id,
			title: movie.title,
			tagline: movie.tagline,
			vote_average: movie.vote_average,
		};
	});
	res.json(movies);
});

// API to get a single movie by ID
app.get("/api/movies/:id", (req, res) => {
	// Convert the ID to the same type for proper comparison
	const movieId: string = req.params.id;

	const movie = moviesData.find((movie) => {
		// Compare as strings to ensure consistent type comparison
		return String(movie.id) === movieId;
	});

	if (movie) {
		res.json(movie);
	} else {
		res.status(404).json({ error: "Movie not found" });
	}
});

// Handle SPA routing - this is crucial for vue-router history mode
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log(
		"Your app is listening on port " + (listener.address() as any).port
	);
});
