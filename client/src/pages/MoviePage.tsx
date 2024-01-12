import Loader from "../components/Loader";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Movie from "../components/Movie";
import { useNavigate, useParams } from "react-router-dom";
import { useMovie } from "../api/use-movie";
import RemoveIcon from "../components/ui/RemoveIcon";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return null;

  const { data, isError, isLoading } = useMovie(+id);

  if (isError)
    return (
      <div className="text-center">There was an error. Sorry about that!</div>
    );

  if (isLoading) return <Loader />;

  return (
    <section>
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
          <button className="m-2 mx-auto block" onClick={() => navigate("/")}>
            <RemoveIcon />
          </button>
        </>
      )}
    </section>
  );
};

export default MoviePage;
