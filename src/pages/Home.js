import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="logo-wrapper">
          <img
            src="images/logo.png"
            className="w-100 max-w240 "
            alt="pokeapi"
          />
        </div>

        <div className="card-wrapper">
          <div>
            <div className="play-card cardOne">
              <div className="d-flex jc-end mb-30">
                <button type="button" className="heart-btn"></button>
              </div>
              <h6>How to Play PokeSwipe</h6>
              <p>Pokemon Appear One at a time</p>
              <p>Choose "Like" or "Dislike"</p>
              <p>Build Your Favorite Team</p>
              <button
                type="button"
                className="go-btn"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/pokemon");
                  }, 100);
                }}
              >
                Let's Go !
              </button>
            </div>
          </div>

          <div className="second-card ">
            <div className="play-card cardTwo">
              <div className="d-flex jc-end mb-30">
                <button type="button" className="heart-btn"></button>
              </div>
              <h6 className="my-20">How to Play PokeSwipe</h6>
              <p className="mb-10">Pokemon Appear One at a time</p>
              <p className="mb-10">Choose "Like" or "Dislike"</p>
              <p className="mb-10">Build Your Favorite Team</p>
              <button type="button" className="go-btn w-100">
                Let's Go !
              </button>
            </div>
          </div>

          <div className="third-card">
            <div className="play-card cardThree">
              <div className="d-flex jc-end mb-30">
                <button type="button" className="heart-btn"></button>
              </div>
              <h6 className="my-20">How to Play PokeSwipe</h6>
              <p className="mb-10">Pokemon Appear One at a time</p>
              <p className="mb-10">Choose "Like" or "Dislike"</p>
              <p className="mb-10">Build Your Favorite Team</p>
              <button type="button" className="go-btn w-100">
                Let's Go !
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
