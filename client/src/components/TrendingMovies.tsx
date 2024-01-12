import { TrendingMovie } from "../../../src/types/types";
import { TMDB_IMAGE_URL } from "./Movie";
import { useTrending } from "../api/use-trending";
import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Loader from "./Loader";

type Props = {
  data: TrendingMovie;
};

const TrendingMovie = ({ data }: Props) => {
  return (
    <div>
      <Link to={`/movie/${data.id}`}>
        <LazyMotion features={domAnimation}>
          <m.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="drop-shadow-xl"
            src={`${TMDB_IMAGE_URL}${data.poster_path}`}
            alt={data.original_title}
          />
        </LazyMotion>
      </Link>
    </div>
  );
};

const TrendingMovies = () => {
  const { data, isLoading, isError } = useTrending();

  if (isError)
    return (
      <div className="text-center">
        Could not get Trending Movies at this time. Sorry!
      </div>
    );

  return (
    <section>
      <h2 className="mb-4 px-2 text-2xl font-light text-zinc-400">
        TRENDING MOVIES
      </h2>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 gap-4 px-2 md:grid-cols-3 md:gap-10">
        {data?.map((movie) => <TrendingMovie key={movie.id} data={movie} />)}
      </div>
    </section>
  );
};

export default TrendingMovies;
