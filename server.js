var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");

// Load movies data
var moviesData = JSON.parse(
	fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf-8")
);

app.use(express.static("public"));

// API to list movies
app.get("/api/movies", function (req, res) {
	var movies = moviesData.map(function (movie) {
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
app.get("/api/movies/:id", function (req, res) {
	// Convert the ID to the same type for proper comparison
	var movieId = req.params.id;

	var movie = moviesData.find(function (movie) {
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
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
