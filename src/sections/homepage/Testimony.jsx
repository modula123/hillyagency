import React, { useEffect, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { assets, testimonies, userList } from "../../assets/assets";

const HomepageTestimony = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const currentTestimony = testimonies[currentIndex];
  const currentUser = userList.find(
    (u) => u.userId === currentTestimony.userId
  );

  const isYouTube = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  const VideoPlayer = ({ src }) => {
    return isYouTube(src) ? (
      <iframe
        className="custom-video"
        width="100%"
        height="400"
        src={convertToEmbedURL(src)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        autoPlay
      />
    ) : (
      <video controls autoPlay className="custom-video">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  // Helper: Convert regular YouTube URL to embeddable URL
  const convertToEmbedURL = (url) => {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]
      : url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    if (showModal) return; // Pause when modal is open

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonies.length);
    }, 10000); // 10s

    return () => clearInterval(interval);
  }, [showModal]); // Watch showModal state

  return (
    <>
      <div className="home-testimony">
        <div className="container">
          <div className="content">
            <div className="testimonies">
              <div className="title">
                <p>Testimonials</p>
                <h2>What People Have Said About Our Service</h2>
              </div>
              <div className="list">
                {currentTestimony && currentUser ? (
                  <div className="item" key={currentTestimony.userId}>
                    <div className="user">
                      <div className="img">
                        <img
                          src={currentUser.profilePicture}
                          alt={currentUser.fullName}
                        />
                      </div>
                      <div className="txt">
                        <h5>{currentUser.fullName}</h5>
                        <p>{currentUser.role}</p>
                      </div>
                    </div>
                    <div className="stars">
                      {"★".repeat(currentTestimony.rating)}
                      {"☆".repeat(5 - currentTestimony.rating)}
                    </div>
                    <div className="message">
                      <p>{currentTestimony.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="no-result">
                    <p>No testimonies for a moment</p>
                  </div>
                )}
              </div>
            </div>
            <div className="video">
              <img
                src={assets.testimonyThumbnail}
                alt="Testimony Video Thumbnail"
              />
              <button onClick={() => setShowModal(true)}>
                <span>
                  <IoPlayOutline />
                </span>
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="video-modal" onClick={() => setShowModal(false)}>
            <div
              className="video-container"
              onClick={(e) => e.stopPropagation()}
            >
              <VideoPlayer
                className="custom-video"
                src={assets.testimonyVideo}
              />

              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomepageTestimony;
