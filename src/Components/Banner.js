import React, { useEffect, useState } from "react";
import requests from "../request";
import axios from "../axiose"; // Renamed from 'axiose' to 'axios'
import "../style/Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null); // Initialize state with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setMovie(response.data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Truncate function to limit text length
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      {movie && (
        <div className="banner_contetents">
          <h1 className="banner_title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button">PLAY</button>
            <button className="banner_button">MY LIST</button>
          </div>
          <h1 className="banner_desscription">{truncate(movie.overview, 150)}</h1>
        </div>
      )}
      <div className="banner_fadeBottom"></div>
    </header>
  );
};

export default Banner;
