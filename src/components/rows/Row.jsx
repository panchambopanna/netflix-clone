import "./Row.css";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { requests } from "../../requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () =>
      await requests.get(fetchUrl).then((res) => setMovies(res));
    fetchData();
  }, [fetchUrl]);

  const baseUrl = "https://image.tmdb.org/t/p/original";

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((res) => {
          const urlParam = new URLSearchParams(new URL(res).search);
          setTrailerUrl(urlParam.get("v"));
        })

        .catch((e) => e.message);
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      {/* container for images */}
      <div className="row_posters">
        {movies.map((item) => (
          <img
            ref={ref}
            key={item.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? item.poster_path : item.backdrop_path
            }`}
            onClick={() => handleClick(item)}
            alt={item.name}
          />
        ))}
      </div>

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={opts}
          onEnd={() => ref.current.click()}
        />
      )}
    </div>
  );
};

export default Row;

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  isLargeRow: PropTypes.bool,
};
