import React, { useState, useEffect } from "react";
import Axios from "../axiose";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "../style/Row.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await Axios.get(fetchUrl);
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const baseurl = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const url = await movieTrailer(movie?.name || "");
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      } catch (error) {
        console.log("Error fetching trailer:", error);
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseurl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
