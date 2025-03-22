import React from "react";

function VideoPlayer({ videoUrl }) {
  return (
    <div className="container">
      <video width="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
