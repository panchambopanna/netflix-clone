import "./Banner.css";
import React, { useState, useEffect } from "react";
import { requests, urls } from "../../requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchBanner = async () =>
      await requests
        .get(urls.fetchNetflixOriginals)
        .then(
          (response) => response[Math.ceil(Math.random() * response.length)]
        )
        .then((response) => setMovie(response))
        .catch((e) => e.message);
    fetchBanner();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  return (
    <header>
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundPosition: "center",
        }}
      >
        {/* background movie - random ones */}
        <div className="banner_contents">
          {/* title */}
          <h1 className="banner_title">
            {movie?.name || movie?.original_name}
          </h1>

          <div className="banner_buttons">
            <button className="banner_button play">Play</button>
            <button className="banner_button myList">My List</button>
          </div>

          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>

        <div className="banner_fadeBottom" />
      </div>
    </header>
  );
};

export default Banner;
