import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Movies from "../pages/Movies";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const movies = [
    { id: 1, title: "Movie 1", rating: 8.5, language: "English" },
    { id: 2, title: "Movie 2", rating: 7.9, language: "Spanish" },
    { id: 3, title: "Movie 3", rating: 6.7, language: "French" },
    { id: 4, title: "Movie 4", rating: 9.1, language: "German" },
    { id: 5, title: "Movie 5", rating: 8.2, language: "Italian" },
  ];

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const results = [...movies].filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="header">Book My Show</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for movies, events, playlists..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "600px",
            height: "40px",
            fontSize: "16px",
            padding: "5px",
            marginLeft: "150px",
            borderRadius: "15px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            marginLeft: "90px",
            height: "40px",
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          <option value="">Select Location</option>
          <option value="Tirupur">Tirupur</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Salem">Salem</option>
        </select>
        <button className="button-1">Sign In</button>
      </div>
      <div className="navigation">
        <div className="left">
          <Link to="/Movies">Movies</Link>
          <a href="/streams">Streams</a>
          <a href="/events">Events</a>
          <a href="/sports">Sports</a>
          <a href="/activities">Activities</a>
        </div>
        <div className="right">
          <a href="/corporates">Corporates</a>
          <a href="/offers">Offers</a>
        </div>
      </div>
      <div className="slide-container">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="slide slide-1"></div>
          <div className="slide slide-2"></div>
          <div className="slide slide-3"></div>
        </div>
      </div>
      <h1 className="header">Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-rating">Rating: {movie.rating}</div>
            <div className="movie-language">Language: {movie.language}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
