//This file has been logic checked and commented

import { useState, useEffect, useRef } from "react";
import css from "./manageCards.module.css";
import { useContext } from "react";
import { userCards } from "../App";
import Nav from "../NavBar/NavBar";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../alert/alert";
import {
  faFolderOpen,
  faFileCircleXmark,
  faFilePen,
  faCircleArrowLeft,
  faCircleArrowRight,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function CardManagement() {
  const paramTopicId = useParams(); //object {id}
  const PORT = useContext(userCards);
  const [hasCards, setHasCards] = useState(false);
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([{}]);
  const [isShowAlert, setIsShowAlert] = useState(false);
  let displayCard = cards[index];
  let alertMessage = useRef("");

  const getCards = async () => {
    try {
      const response = await fetch(
        `${PORT}/cards/manageCards/${paramTopicId.id}`,
      );
      if (response.ok) {
        const responseData = await response.json();

        if (!responseData.length) {
          //Check if responseData is empty
          setHasCards(false);
          return; //Stop the function if true
        }

        setHasCards(true);

        setCards(responseData);
      }
    } catch (err) {
      console.error(err, "Something went wrong");
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const handleNext = () => {
    //change card by checking index n length
    if (index < cards.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setIsShowAlert(true);
      alertMessage.current = "Last card has been reached";
    }
  };

  const handlePrevious = () => {
    //change card by checking index n length
    if (index > cards.length - cards.length) {
      setIndex((i) => i - 1);
    } else {
      setIsShowAlert(true);
      alertMessage.current = "First card has been reached";
    }
  };

  const handleDelete = (id) => {
    //delete the card from the database

    const answer = prompt(`Are you want to delete card ${id}`)
      .toLowerCase()
      .toString();

    //if user does not say yes , stop function
    if (answer !== "yes") {
      return null;
    }
    (async () => {
      try {
        const response = await fetch(
          `${PORT}/cards/manageCards/${paramTopicId.id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          },
        );
        if (response.ok) {
          const responseData = await response.json();
          getCards();
          alert(responseData.message);
        }
      } catch (err) {
        console.error(err, "Something Went Wrong");
      }
    })();
  };

  return (
    <>
      <div className={css.App_container}>
        <Nav btnName="/Cards" />
        {isShowAlert ? (
          <Alert
            message={alertMessage.current}
            isWarning={true}
            close={() => {
              setIsShowAlert(false);
            }}
          />
        ) : null}
        {/* Check if the database has cardData */}
        {hasCards ? (
          // Check if displayCard has cardData
          displayCard ? (
            <>
              <div className={css.align_display}>
                <button className={css.next_prev_btn} onClick={handlePrevious}>
                  <FontAwesomeIcon
                    className={css.arrow_display}
                    icon={faCircleArrowLeft}
                  />
                </button>
                <div className={css.card_display}>
                  <h1 className={css.title}>Card {displayCard.cardId}</h1>
                  <div className={css.topic_container} key={displayCard.cardId}>
                    <h1>{displayCard.question}</h1>
                  </div>
                  <div className={css.topic_container}>
                    <h1>{displayCard.answer}</h1>
                  </div>
                </div>
                <button className={css.next_prev_btn} onClick={handleNext}>
                  <FontAwesomeIcon
                    className={css.arrow_display}
                    icon={faCircleArrowRight}
                  />
                </button>
              </div>
              <div className={css.align_display_btns}>
                <Link to={"/Cards"} className={css.link}>
                  <button
                    className={`${css.returnBtn} ${css.manageBtns}`}
                    style={{ width: "140px" }}
                  >
                    Change topic
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </button>
                </Link>
                <div className={css.manageBtns_arrange}>
                  <Link
                    to={`/AddCard/${displayCard.topicId}`}
                    className={css.link}
                  >
                    <button className={css.manageBtns}>
                      Add <FontAwesomeIcon icon={faFileCirclePlus} />
                    </button>
                  </Link>
                  <Link
                    to={`/Edit/${displayCard.cardId}/${displayCard.topicId}`}
                    className={css.link}
                  >
                    <button className={css.manageBtns}>
                      Edit <FontAwesomeIcon icon={faFilePen} />
                    </button>
                  </Link>
                  <button
                    className={css.manageBtns}
                    onClick={() => handleDelete(displayCard.cardId)}
                  >
                    Delete
                    <FontAwesomeIcon icon={faFileCircleXmark} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h2>Loading ....</h2>
          )
        ) : (
          <>
            <div className={css.align_display}>
              <div className={css.card_display}>
                <h2 style={{ color: "white" }}>
                  There are currently no cards in this topic
                </h2>
                <Link to={`/AddCard/${paramTopicId.id}`} className={css.link}>
                  <button>Add Card</button>
                </Link>
              </div>
            </div>
            <div className={css.align_display}>
              <Link to={"/"} className={css.link}>
                <button className={css.manageBtns}>Home</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
