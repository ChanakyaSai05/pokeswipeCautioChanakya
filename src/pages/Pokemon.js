import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Pokemon() {
  const context = useContext(UserContext);
  const { cards, setcards, selectedCards, setselectedCards } = context;
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextUrl, setnextUrl] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingAbilities, setloadingAbilities] = useState(false);

  const getCardsData = async (url) => {
    setloading(true);
    try {
      let response = await axios({
        url: url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        let abilities = [];
        if (cards.length === 0) {
          abilities = await getAbilities(response.data.results[0], 0, "normal");
        }
        setnextUrl(response.data.next);
        setcards((prev) => {
          let previousData = [...prev];
          let newData = response.data.results.filter((card) => {
            // Check if the card already exists in the state
            return !previousData.find(
              (existingCard) => existingCard.name === card.name
            );
          });
          newData = newData?.map((item) => {
            if (item.name === response.data.results[0].name) {
              return { ...item, abilities };
            } else {
              return { ...item, abilities: [] };
            }
          });
          return [...previousData, ...newData];
        });
        setloading(false);
      } else {
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      if (error.response.status == 401) {
      }
      console.log(error);
    }
  };
  const getAbilities = async (data, index = 0, from = "normal") => {
    try {
      let response = await axios({
        url: data?.url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        if (from === "normal") {
          return response.data.abilities;
        } else {
          setcards((prev) => {
            let previousData = [...prev];
            let newData = [...previousData];
            newData[index] = {
              ...newData[index],
              abilities: [...response.data.abilities],
            };
            return newData;
          });
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const getCardClass = (card_index) => {
    if (card_index === 0) {
      return "cardOne";
    } else if (card_index === 1) {
      return "cardTwo";
    } else if (card_index === 2) {
      return "cardThree";
    } else {
      return "cardOne";
    }
  };
  const getCardClassContainer = (card_index) => {
    if (card_index === 0) {
      return "";
    } else if (card_index === 1) {
      return "second-card";
    } else if (card_index === 2) {
      return "third-card";
    } else {
      return "";
    }
  };
  const getImageIndex = (card) => {
    let url = card?.url?.split("/");
    let image_index = url[url.length - 2];
    return image_index;
  };
  const handleAction = async (from) => {
    setloadingAbilities(true);
    if (currentIndex < cards?.length - 1) {
      let index = currentIndex + 1;
      let data = { ...cards[currentIndex + 1] };
      getAbilities(data, index, "like");
      if (from === "like-button") {
        setselectedCards((prev) => [...prev, { ...cards[currentIndex] }]);
      }

      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === cards?.length - 3) {
      if (nextUrl) {
        getCardsData(nextUrl);
      }
    }
    setloadingAbilities(false);
  };
  useEffect(() => {
    getCardsData(`https://pokeapi.co/api/v2/pokemon`);
  }, []);

  console.log(cards, "cards");
  console.log(currentIndex, "currentIndex");
  console.log(selectedCards, "selected cards");

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

        {cards
          ?.slice(currentIndex, currentIndex + 3)
          ?.map((card, card_index) => (
            <div className="card-wrapper">
              <div className={`${getCardClassContainer(card_index)}`}>
                <div
                  className={`play-card ${getCardClass(card_index)}`}
                  key={card_index}
                >
                  <div className="card-image">
                    <div className="card-image-svg">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getImageIndex(
                          card
                        )}.svg`}
                        className=""
                        alt="pokeapi"
                      />
                    </div>
                    <div className="">
                      <button type="button" className="heart-btn">
                        <svg className="icon">
                          <use href="#icon_heart"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="card-title">
                    <h6>{card?.name}</h6>
                  </div>
                  {card?.abilities?.length > 0 ? (
                    <div className="card-abilities">
                      {card?.abilities?.map((ability) => (
                        <div>{ability?.ability?.name}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="card-abilities">
                      <div className="mb-20">&nbsp;</div>
                    </div>
                  )}

                  <div className="like-buttons">
                    <button
                      type="button"
                      className="dislike-btn"
                      onClick={() => {
                        handleAction("dislike-button");
                      }}
                    >
                      Dislike
                    </button>
                    <button
                      type="button"
                      className="like-btn"
                      onClick={() => {
                        handleAction("like-button");
                      }}
                    >
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        className="next-btn"
        onClick={() => {
          navigate("/selected-pokemon");
        }}
      >
        <svg className="icon">
          <use href="#icon_next"></use>
        </svg>
      </button>
    </>
  );
}

export default Pokemon;
