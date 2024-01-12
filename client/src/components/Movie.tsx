import { MovieInfo } from "../../../src/types/types";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import Tmdb from "./Tmdb";

export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original/";
type Props = {
  movie: MovieInfo;
};

const Movie = ({ movie }: Props) => {
  if (movie.id) {
    const queryClient = useQueryClient();
    queryClient.setQueryData(["movie", movie.id], movie);
  }

  return (
    <div className="relative mb-4 mt-2">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2.0 }}
          className="pointer-events-none absolute inset-0 h-[80vh] bg-cover bg-center bg-no-repeat opacity-30 blur-xl filter"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${TMDB_IMAGE_URL}${movie.backdrop_path})`
              : "",
          }}
        ></m.div>
      </LazyMotion>
      <div>
        <header className="my-0 overflow-hidden blur-none filter">
          {movie.poster_path && (
            <LazyMotion features={domAnimation}>
              <m.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className={`mx-auto my-8 block w-9/12 drop-shadow-xl md:w-10/12 md:max-w-lg ${
                  movie.adult && "blur-md"
                }`}
                src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
                alt={movie.original_title}
              />
            </LazyMotion>
          )}
          <h1
            className="mr-2 inline-block text-2xl font-semibold md:text-4xl"
            aria-label="Movie title"
          >
            {movie.title}
          </h1>
          <span className="inline text-slate-400">
            {movie.original_title}{" "}
            <small className="text-xs">
              [{movie?.original_language.toUpperCase()}]
            </small>
          </span>
          {movie.adult && (
            <small className="ml-2 text-xs text-slate-400">NSFW</small>
          )}
          <p className="text-md mb-4 md:text-lg">{movie.overview}</p>
        </header>
        <div className="px-6 text-zinc-400 lg:px-40" aria-label="Movie details">
          <div className="md:mb-4 md:flex md:items-center md:justify-between">
            <div>
              Runtime: <span>{movie.runtime}</span>
            </div>
            <div>
              Release date: <span>{movie.release_date}</span>
            </div>
            <div>
              Genres: <span>{movie.genres}</span>
            </div>
          </div>
          <p className="md:mb-4">Cast: {movie.cast}</p>
          <p>Director: {movie.crew}</p>
        </div>
      </div>
      <Tmdb />
    </div>
  );
};

export default Movie;
