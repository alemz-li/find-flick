import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const brandClasses =
    "p-4 text-center text-5xl font-bold drop-shadow-glow md:mb-2 md:text-6xl";

  return (
    <div className="flex items-center justify-center">
      {location.pathname.includes("/movie/") ? (
        <Link to="/" className={brandClasses}>
          FIND FLICK
        </Link>
      ) : (
        <h1 className={brandClasses}>FIND FLICK</h1>
      )}
    </div>
  );
};

export default Header;
