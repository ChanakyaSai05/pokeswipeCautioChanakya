import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SelectedCards() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { selectedCards } = context;
  const getImageIndex = (card) => {
    let url = card?.url?.split("/");
    let image_index = url[url.length - 2];
    return image_index;
  };
  return (
    <>
      <div className="container">
        <div className="d-flex jc-center my-20 add-back">
          <img
            src="images/logo.png"
            className="w-100 max-w240 "
            alt="pokeapi"
          />
          <button
            type="button"
            className="back-btn"
            onClick={() => {
              navigate("/pokemon");
            }}
          >
            <svg className="icon">
              <use href="#icon_arrow"></use>
            </svg>
          </button>
        </div>

        <h4 className="liketext">
          Pokemon you have liked{" "}
          <svg className="icon ">
            <use href="#icon_heart"></use>
          </svg>
        </h4>

        <div className="like-content">
          {selectedCards?.map((card, card_index) => (
            <div className="like-card text-center">
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

              <h4>{card?.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SelectedCards;
