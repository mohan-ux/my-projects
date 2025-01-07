import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/book.css";

const BookingForm = ({ movies }) => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const selected = movies.find((movie) => movie.id.toString() === id);
    setSelectedMovie(selected);
  }, [id, movies]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  const indexInLanguageGroup = movies
    .filter((movie) => movie.language === selectedMovie.language)
    .findIndex((movie) => movie.id === selectedMovie.id);

  const backgroundClass = `${selectedMovie.language.toLowerCase()}-${
    indexInLanguageGroup + 1
  }`;

  // Define the background image URL
  const backgroundImageUrl = `../images/${selectedMovie.language.toLowerCase()}${
    indexInLanguageGroup + 1
  }.jpeg`;

  // Render stars based on rating
  const renderStars = () => {
    const rating = selectedMovie.rating;
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
    return stars;
  };

  return (
    <div className="top">
      <div className="main">
        <h1>BOOKING DETAILS</h1>
        <div className={`movie-background ${backgroundClass}`}></div>
        <div className="movie-info">
          <h2>{selectedMovie.title}</h2>
          <p className="stars">Rating: {renderStars()}</p>
          <p>Language: {selectedMovie.language}</p>
        </div>
      </div>
      <div className="second">
        <div className="live-ratings">
          <h2>Live Ratings</h2>
          <input type="text" placeholder="Enter live ratings" />
        </div>

        <div className="format-selection">
          <h3>Format:</h3>
          <select>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
        </div>
        <div className="language-selection">
          <h3>Language:</h3>
          <select>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="Kannada">Kannada</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        <button className="book-button">Book Tickets</button>
      </div>
    </div>
  );
};

export default BookingForm;
