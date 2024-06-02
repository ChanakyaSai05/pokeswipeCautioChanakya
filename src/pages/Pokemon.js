import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

function Pokemon() {
  // Accessing context values
  const context = useContext(UserContext);
  const {
    cards,
    setcards,
    selectedCards,
    setselectedCards,
    currentIndex,
    setCurrentIndex,
    nextUrl,
    setnextUrl,
  } = context;
  const navigate = useNavigate(); // Initializing navigate function for navigation

  const [loading, setloading] = useState(false);
  const [loadingAbilities, setloadingAbilities] = useState(false);

  // Function to fetch card data from the API
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

  // Function to fetch abilities of a specific card
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

  // Function to get CSS class for card based on index
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

  // Function to get CSS class for card container based on index
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

  // Function to get the image index for the card image URL
  const getImageIndex = (card) => {
    let url = card?.url?.split("/");
    let image_index = url[url.length - 2];
    return image_index;
  };

  // Function to handle actions for liking or disliking a card
  const handleAction = async (from) => {
    setloadingAbilities(true);
    if (currentIndex === cards?.length - 3) {
      if (nextUrl) {
        getCardsData(nextUrl);
      }
    }
    if (currentIndex < cards?.length - 1) {
      let index = currentIndex + 1;
      let data = { ...cards[currentIndex + 1] };
      getAbilities(data, index, "like");
      if (from === "like-button") {
        setselectedCards((prev) => [...prev, { ...cards[currentIndex] }]);
      }
      let cardOne = document.querySelector(".cardOne");
      let heartBtn = document.querySelector(".heart-btn");
      if (cardOne) {
        cardOne.style.transform = "translateY(-50px)";
        if (from === "like-button") {
          heartBtn.style.color = "red";
          heartBtn.classList.add("pulse");
        }
      }
      setTimeout(() => {
        cardOne.style.transform = "";
        heartBtn.style.color = "";
        heartBtn.classList.remove("pulse");
        setCurrentIndex(currentIndex + 1);
      }, 250);
    }
    setloadingAbilities(false);
  };

  // useEffect hook to fetch initial pokemon card data when the component mounts
  useEffect(() => {
    if (!nextUrl) {
      getCardsData(`https://pokeapi.co/api/v2/pokemon`);
    }
  }, []);

  return (
    <>
      {/* Main container for the Pokemon component */}
      <div className="container">
        {/* Logo section */}
        <div className="logo-wrapper">
          <img
            src="images/logo.png"
            className="w-100 max-w240 "
            alt="pokeapi"
          />
        </div>
        {/* loader will display when api is loading */}
        {loading && (
          <div className="loader">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#feca1b", "#feca1b", "#feca1b", "#feca1b", "#feca1b"]}
            />
          </div>
        )}
        {/* Displaying the cards */}
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
                      {card?.abilities?.map((ability, index) => {
                        const halfIndex = Math.ceil(card.abilities.length / 2);
                        const abilityClass =
                          index < halfIndex ? "first-half" : "second-half";
                        return (
                          <div
                            key={ability?.ability?.name}
                            className={abilityClass}
                          >
                            {ability?.ability?.name}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="card-abilities">
                      <div
                        className="mb-20"
                        style={{
                          border: "none",
                        }}
                      >
                        <br />
                      </div>
                    </div>
                  )}

                  {/* Like and Dislike buttons */}
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
      {/* Display the number of liked pokemon cards and a button to navigate to the liked pokemon cards page */}
      {selectedCards?.length > 0 && (
        <div className="like-count">Your Likes : {selectedCards?.length}</div>
      )}
      {selectedCards?.length > 0 && (
        <button
          className="next-btn"
          onClick={() => {
            navigate("/liked-pokemon");
          }}
        >
          <svg className="icon">
            <use href="#icon_next"></use>
          </svg>
        </button>
      )}
    </>
  );
}

export default Pokemon;
