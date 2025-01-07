import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Movie.css";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const movies = [
    {
      id: 1,
      title: "Movie 1",
      rating: 4,
      language: "Tamil",
    },
    {
      id: 2,
      title: "Movie 2",
      rating: 3,
      language: "Tamil",
      backgroundUrl: "../images/tam1.jpeg",
    },
    { id: 3, title: "Movie 3", rating: 5, language: "Tamil" },
    { id: 4, title: "Movie 4", rating: 4, language: "Tamil" },
    { id: 5, title: "Movie 5", rating: 2, language: "Tamil" },
    { id: 6, title: "Movie 6", rating: 4, language: "Malayalam" },
    { id: 7, title: "Movie 7", rating: 3, language: "Malayalam" },
    { id: 8, title: "Movie 8", rating: 5, language: "Malayalam" },
    { id: 9, title: "Movie 9", rating: 4, language: "Malayalam" },
    { id: 10, title: "Movie 10", rating: 3, language: "Malayalam" },
    { id: 11, title: "Movie 11", rating: 5, language: "Hindi" },
    { id: 12, title: "Movie 12", rating: 4, language: "Hindi" },
    { id: 13, title: "Movie 13", rating: 3, language: "Hindi" },
    { id: 14, title: "Movie 14", rating: 4, language: "Hindi" },
    { id: 15, title: "Movie 15", rating: 5, language: "Hindi" },
    { id: 16, title: "Movie 16", rating: 4, language: "Kannada" },
    { id: 17, title: "Movie 17", rating: 3, language: "Kannada" },
    { id: 18, title: "Movie 18", rating: 4, language: "Kannada" },
    { id: 19, title: "Movie 19", rating: 5, language: "Kannada" },
    { id: 20, title: "Movie 20", rating: 4, language: "Kannada" },
    { id: 21, title: "Movie 21", rating: 3, language: "Telugu" },
    { id: 22, title: "Movie 22", rating: 4, language: "Telugu" },
    { id: 23, title: "Movie 23", rating: 5, language: "Telugu" },
    { id: 24, title: "Movie 24", rating: 4, language: "Telugu" },
    { id: 25, title: "Movie 25", rating: 3, language: "Telugu" },
  ];

  const groupedMovies = movies.reduce((acc, movie) => {
    if (!acc[movie.language]) {
      acc[movie.language] = [];
    }
    acc[movie.language].push(movie);
    return acc;
  }, {});

  const filterMovies = (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const renderRatingStars = (rating) => {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    return <div>{stars}</div>;
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>
      {Object.keys(groupedMovies).map((language, index) => (
        <div key={index}>
          <h2 className="heading">{language}</h2>
          <div className="movies-row">
            {groupedMovies[language]
              .filter(filterMovies)
              .map((movie, movieIndex) => (
                <Link
                  key={movieIndex}
                  to={{
                    pathname: `/booking/${movie.id}`,
                    state: { backgroundUrl: movie.backgroundUrl },
                  }}
                  className={`movie-container ${language.toLowerCase()}-${
                    movieIndex + 1
                  }`}
                >
                  <div className="rating-container">
                    {renderRatingStars(movie.rating)}
                  </div>
                  <div className="title-container">{movie.title}</div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
