import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Home() {
  // Accessing the context values
  const context = useContext(UserContext);
  const { setcards, setselectedCards, setCurrentIndex, setnextUrl } = context;
  const navigate = useNavigate(); // Initializing navigate function for navigation
  return (
    <>
      {/* Main container for the Home component */}
      <div className="container">
        {/* Logo section */}
        <div className="logo-wrapper">
          <img
            src="images/logo.png"
            className="w-100 max-w240 "
            alt="pokeapi"
          />
        </div>
        {/* Card wrapper containing the rules and game initiation button */}
        <div className="card-wrapper">
          <div>
            <div className="play-card cardOne">
              <div className="d-flex jc-end mb-30">
                <button type="button" className="heart-btn">
                  <svg className="icon">
                    <use href="#icon_heart"></use>
                  </svg>
                </button>
              </div>
              <h6>How to Play PokéSwipe</h6>
              <p>Pokémon Appear One at a time</p>
              <p>Choose "Like" or "Dislike"</p>
              <p>Build Your Favorite Team</p>
              {/* Button to start the game */}
              <button
                type="button"
                className="go-btn"
                onClick={() => {
                  // Resetting the game state before navigating to the next page
                  setCurrentIndex(0);
                  setcards([]);
                  setselectedCards([]);
                  setnextUrl(null);
                  setTimeout(() => {
                    navigate("/pokemon");
                  }, 100);
                }}
              >
                Let's Go !
              </button>
            </div>
          </div>
          {/* Placeholder cards for layout consistency */}
          <div className="second-card ">
            <div className="play-card cardTwo">
              <div className="d-flex jc-end mb-30">
                <button type="button" className="heart-btn"></button>
              </div>
              <h6 className="my-20">&nbsp;</h6>
              <p className="mb-10">&nbsp;</p>
              <p className="mb-10">&nbsp;</p>
              <p className="mb-10">&nbsp;</p>
              <button type="button" className="go-btn w-100">
                &nbsp;
              </button>
            </div>
          </div>

          <div className="third-card">
            <div className="play-card cardThree">
              <div className="d-flex jc-end mb-30">
                <button type="button" className="heart-btn"></button>
              </div>
              <h6 className="my-20">&nbsp;</h6>
              <p className="mb-10">&nbsp;</p>
              <p className="mb-10">&nbsp;</p>
              <p className="mb-10">&nbsp;</p>
              <button type="button" className="go-btn w-100">
                &nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
