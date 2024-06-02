import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SelectedCards() {
  const context = useContext(UserContext); // Accessing context values
  const navigate = useNavigate(); // Initializing navigate function for navigation
  const { selectedCards, theme } = context; // Destructuring values from context

  // Function to get the image index for the card image URL
  const getImageIndex = (card) => {
    let url = card?.url?.split("/");
    let image_index = url[url.length - 2];
    return image_index;
  };

  return (
    <>
      {/* Main container for the Like cards component */}
      <div className="container-selected">
        {/* Logo and Back button section */}
        <div className="d-flex jc-center my-20 add-back">
          <img
            src="images/logo.png"
            className="w-100 max-w240 "
            alt="pokeapi"
          />
          <button
            type="button"
            className={`back-btn ${theme === "dark" ? "dark-opacity" : ""}`}
            onClick={() => {
              navigate("/pokemon"); // Navigate back to the Pokemon page
            }}
          >
            <svg className="icon">
              <use href="#icon_arrow"></use>
            </svg>
          </button>
        </div>

        {/* Title for liked Pokémon */}
        <h4 className={`liketext ${theme === "dark" ? "dark-opacity" : ""}`}>
          Pokémon you have liked{" "}
          <svg className="icon ">
            <use href="#icon_heart"></use>
          </svg>
        </h4>

        {/* Displaying the liked Pokémon cards */}
        <div className="like-content">
          {selectedCards?.map((card, card_index) => (
            <div className="like-card text-center" key={card_index}>
              <div className="d-flex jc-center mb-20">
                <div className="img-box">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getImageIndex(
                      card
                    )}.svg`}
                    alt="like"
                  />
                </div>
              </div>

              {/* Displaying the name of the Pokémon */}
              <h4>{card?.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectedCards;
