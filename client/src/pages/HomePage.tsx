import { useCount } from "../api/use-count";
import { useRandomMovie } from "../api/use-random-movie";
import Loader from "../components/Loader";
import Movie from "../components/Movie";
import { m, LazyMotion, domAnimation } from "framer-motion";
import RemoveIcon from "../components/ui/RemoveIcon";
import { useQueryClient } from "@tanstack/react-query";
import TrendingMovies from "../components/TrendingMovies";
import Tmdb from "../components/Tmdb";

const HomePage = () => {
  useCount();
  const queryClient = useQueryClient();

  const clearMovie = () => {
    queryClient.setQueryData(["random"], null);
  };

  const handleCancel = () => {
    queryClient.cancelQueries({ queryKey: ["random"] });
  };

  const { data, isFetching, refetch, isError } = useRandomMovie();

  if (isError)
    return (
      <div className="text-center">There was an error. Sorry about that!</div>
    );

  if (isFetching)
    return (
      <>
        <p className="text-center text-zinc-400">Searching movie</p>
        <Loader />
        <button
          className="mx-auto block text-zinc-500 underline"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </>
    );

  return (
    <>
      <section className="mb-8 flex flex-col items-center justify-center text-gray-300">
        {!data && (
          <div className="text-md text-center">
            <p>Got nothing to watch?</p>
            <p className="mb-4">
              Click the button to get a <b>random</b> movie suggestion
            </p>
            <Tmdb />
          </div>
        )}
        <button
          onClick={() => refetch()}
          className="group relative my-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-700 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
          aria-label="Get movie"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 font-semibold transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Get Movie
          </span>
        </button>
      </section>
      <section aria-label="Random movie result" id="random-movie-result">
        {data && (
          <>
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Movie movie={data} />
              </m.div>
            </LazyMotion>
            <button
              className="m-2 mx-auto block"
              onClick={clearMovie}
              id="clear-movie"
            >
              <RemoveIcon />
            </button>
          </>
        )}
      </section>
      {!data && <TrendingMovies />}
    </>
  );
};

export default HomePage;
