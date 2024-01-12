import { Cast, Genre, MovieInfo, TmdbMovieApi } from "../types/types";
export const generateRandomNumber = (count: number): number => {
  return Math.floor(Math.random() * count + 1);
};

export const showCast = (cast: Cast[]) => {
  // Pick only first 10 from cast array
  const first10 = cast.slice(0, 10);

  if (first10.length > 1) {
    const castList = first10.map((c) => {
      return c.name;
    });
    return castList.join(", ");
  } else if (first10.length === 1) {
    return first10[0].name;
  } else {
    return "Not specified";
  }
};

export const showGenres = (genres: Genre[]) => {
  if (genres.length > 1) {
    const genresList = genres.map((genre) => {
      return genre.name;
    });
    return genresList.join(", ");
  } else if (genres.length === 1) {
    return genres[0].name;
  } else {
    return "Not specified";
  }
};

export const calcRuntime = (mins: number): string => {
  if (mins === 0) return "Not specified";

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const getDirectors = (crew: Cast[]) => {
  const directors = crew
    .filter((person) => person.job === "Director")
    .map((person) => person.name);

  if (directors.length > 1) {
    return directors.join(", ");
  } else if (directors.length === 1) {
    return directors[0];
  } else {
    return "Not specified";
  }
};

export const movieInfo = (movie: TmdbMovieApi): MovieInfo => {
  return {
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    genres: showGenres(movie.genres),
    id: movie.id,
    cast: showCast(movie.credits.cast),
    imdb_id: movie.imdb_id,
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    runtime: calcRuntime(movie.runtime),
    title: movie.title,
    crew: getDirectors(movie.credits.crew),
  };
};
