//This file has been logic checked and commented

import { useState, useEffect, useRef } from "react";
import css from "../ManageCards/manageCards.module.css";
import { useContext } from "react";
import { userCards } from "../App";
import Nav from "../NavBar/NavBar";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileCircleXmark,
  faFilePen,
  faCircleArrowLeft,
  faCircleArrowRight,
  faBookOpen,
  faFileCirclePlus,
  faFolderOpen,
  faArrowRotateRight,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function CardManagement() {
  const cardId = useParams(); //object {topicId,index}
  const PORT = useContext(userCards);
  const [index, setIndex] = useState(+cardId.index);
  const [isQuestion, setIsQuestion] = useState(true);
  const [dbCards, setDbCards] = useState([{}]);
  const [isCoolDown, setIsCoolDown] = useState(true);
  const timerCard = useRef([]);
  let card = [...dbCards];
  let displayCards = card[index];

  //define .isbad property
  if (displayCards.isBad === undefined) {
    displayCards.isBad = false;
  }

  const getCards = async () => {
    try {
      const response = await fetch(
        `${PORT}/cards/manageCards/${cardId.topicId}`,
      );
      if (response.ok) {
        const responseData = await response.json();
        setDbCards(responseData);
      }
    } catch (err) {
      console.error(err, "Something Went Wrong");
    }
  };

  const setCardGood = async (cardId) => {
    try {
      const response = await fetch(
        `${PORT}/stats/manageStats/addGood/${cardId}`,
      );
      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (err) {
      console.error(err, "Something Went Wrong");
    }
  };

  const setCardBad = async (cardId) => {
    try {
      const response = await fetch(
        `${PORT}/stats/manageStats/addBad/${cardId}`,
      );
      if (!response.ok) {
        console.log(response.status);
      }
    } catch (err) {
      console.error(err, "Something Went Wrong");
    }
  };

  useEffect(() => {
    getCards();

    //clean out timeOut
    return () => {
      clearTimeout(timerCard.current);
    };
  }, []);

  const handleNext = () => {
    if (index < card.length - 1) {
      setIndex((i) => i + 1);
    } else {
      alert("Last card reached");
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    } else {
      alert("First card reached");
    }
  };

  const handleShowAnswer = () => {
    setIsQuestion(false);
  };

  const tryAgain = () => {
    setIsQuestion(true);
  };

  const handleGood = (cardId) => {
    setIsQuestion(true);
    handleNext();
    //handle good too the database card
    setCardGood(cardId);
  };

  const handleBad = (displayCard) => {
    //disbale card for certain time
    displayCard.isBad = true;

    //set timeOut for card
    handleBadCards(displayCard);

    //hande bad to the database card
    setCardBad(displayCard.cardId);

    setIsQuestion(true);
  };

  const handleBadCards = (displayCard) => {
    timerCard.current = setTimeout(() => {
      displayCard.isBad = false;
      alert(`Card ${displayCard.cardId}: Cooldown complete !`);

      //force re-render
      setIsCoolDown((n) => {
        return (n = !n);
      });
    }, 60000);
  };

  return (
    <>
      <div className={css.App_container}>
        <Nav btnName="/ReviseCards" />
        {/* force re-render */}
        {isCoolDown ? null : null}

        {isQuestion ? (
          //check if isBad is defined
          displayCards.isBad ? (
            <>
              <div className={css.align_display}>
                <button className={css.next_prev_btn} onClick={handlePrevious}>
                  <FontAwesomeIcon
                    className={css.arrow_display}
                    icon={faCircleArrowLeft}
                  />
                </button>
                <div className={css.card_display}>
                  <h1 style={{ color: "white" }}>Card {displayCards.cardId}</h1>
                  <h2 style={{ color: "white" }}>Card is in Cool Down</h2>
                  <h2 style={{ color: "white" }}>Check Back in 5 minute</h2>
                </div>
                <button className={css.next_prev_btn} onClick={handleNext}>
                  <FontAwesomeIcon
                    className={css.arrow_display}
                    icon={faCircleArrowRight}
                  />
                </button>
              </div>
              <div className={css.align_display}>
                <Link to={"/ReviceCards"} className={css.link}>
                  <button
                    className={`${css.returnBtn} ${css.manageBtns}`}
                    style={{ width: "140px" }}
                  >
                    Change topic
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={css.align_display}>
                <button className={css.next_prev_btn} onClick={handlePrevious}>
                  <FontAwesomeIcon
                    className={css.arrow_display}
                    icon={faCircleArrowLeft}
                  />
                </button>
                <div className={css.card_display}>
                  <h1 style={{ color: "white" }}>Card {displayCards.cardId}</h1>
                  <div
                    className={css.topic_container}
                    key={displayCards.cardId}
                  >
                    <h1>{displayCards.question}</h1>
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
                <Link to={"/ReviceCards"} className={css.link}>
                  <button
                    className={`${css.returnBtn} ${css.manageBtns}`}
                    style={{ width: "140px" }}
                  >
                    Change topic
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </button>
                </Link>
                <div className={css.manageBtns_arrange}>
                  <button
                    className={css.manageBtns}
                    style={{ width: "140px" }}
                    onClick={() => handleShowAnswer(displayCards.cardId)}
                  >
                    Show Answer
                    <FontAwesomeIcon icon={faBookOpen} />
                  </button>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className={css.align_display}>
              <div className={css.card_display}>
                <h1 style={{ color: "white" }}>Card {displayCards.cardId}</h1>
                <div className={css.topic_container}>
                  <h1>{displayCards.answer}</h1>
                </div>
              </div>
            </div>
            <div className={css.align_display_btns}>
              <Link to={`/ReviceCards`} className={css.link}>
                <button
                  className={`${css.returnBtn} ${css.manageBtns}`}
                  style={{ width: "140px" }}
                >
                  Change topic
                  <FontAwesomeIcon icon={faFolderOpen} />
                </button>
              </Link>
              <div className={css.manageBtns_arrange}>
                <button className={css.manageBtns} onClick={tryAgain}>
                  Try Again
                  <FontAwesomeIcon icon={faArrowRotateRight} />
                </button>
                <button
                  className={css.manageBtns}
                  onClick={() => handleGood(displayCards.cardId)}
                >
                  Good
                  <FontAwesomeIcon icon={faCircleCheck} />
                </button>
                <button
                  className={css.manageBtns}
                  onClick={() => handleBad(displayCards)}
                >
                  Bad
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
