// Shared type definitions for both frontend and backend

/**
 * Represents a movie genre
 */
export interface Genre {
	id: number;
	name: string;
}

/**
 * Represents a production company
 */
export interface Company {
	id: number;
	name: string;
}

/**
 * Represents a spoken language
 */
export interface Language {
	iso_639_1: string;
	name: string;
}

/**
 * Represents a movie with all possible properties
 */
export interface Movie {
	id: number;
	title: string;
	original_title?: string;
	tagline: string;
	vote_average: number;
	vote_count: number;
	runtime: number;
	release_date: string;
	status: string;
	overview: string;
	homepage?: string;
	imdb_id?: string;
	genres?: Genre[];
	production_companies?: Company[];
	spoken_languages?: Language[];
	[key: string]: any; // For other properties that might exist in the data
}

/**
 * Represents a simplified movie for list views
 */
export interface MovieListItem {
	id: number;
	title: string;
	tagline: string;
	vote_average: number;
}
