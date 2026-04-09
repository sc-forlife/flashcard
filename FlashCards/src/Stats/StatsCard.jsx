//This file has been logic checked and commented

import { useEffect, useState } from "react";
import css from "../ManageCards/manageCards.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { userCards } from "../App";
import NavBar from "../NavBar/NavBar";

export default function StatsCard() {
  const PORT = useContext(userCards);
  const topic_id = useParams(); // object {id}
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  let displayCard = cards[index];

  const getCards = async () => {
    try {
      const response = await fetch(`${PORT}/cards/manageCards/${topic_id.id}`);
      if (response.ok) {
        const responseData = await response.json();
        setCards(responseData);
      }
    } catch (err) {
      console.error(err, "Something Went Wrong");
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const handleNext = () => {
    if (index < cards.length - 1) {
      setIndex((i) => i + 1);
    } else {
      alert("Last card reached");
    }
  };

  const handlePrevious = () => {
    index > cards.length - cards.length
      ? setIndex((i) => i - 1)
      : alert("First card reached");
  };

  //Get the rataining rate
  const getPercentage = (good, bad) => {
    if (typeof good === "number" && typeof bad === "number") {
      let percent = Math.round((good / (bad + good)) * 100);
      return percent;
    } else {
      return `${undefined} `;
    }
  };

  return (
    <>
      <div className={css.App_container}>
        <NavBar btnName="/Stats" />
        {/*Prevent render of undefined displayCard */}
        {displayCard ? (
          <>
            <div className={css.align_display}>
              <button className={css.next_prev_btn} onClick={handlePrevious}>
                Previous
              </button>
              <div className={css.card_display}>
                <h1 style={{ color: "white" }} className={css.title}>
                  Card {displayCard.cardId}
                </h1>
                <h2 style={{ color: "white" }} className={css.stats}>
                  Good:{displayCard.good}
                </h2>
                <h2 style={{ color: "white" }} className={css.stats}>
                  Bad:{displayCard.bad}
                </h2>
                <h2
                  style={{ color: "white" }}
                  className={css.stats}
                >{`Retaining Rate: ${getPercentage(displayCard.good, displayCard.bad)}%`}</h2>
                <div className={css.topic_container}>
                  <h1>{displayCard.question}</h1>
                </div>
                <div className={css.topic_container}>
                  <h1>{displayCard.answer}</h1>
                </div>
              </div>
              <button className={css.next_prev_btn} onClick={handleNext}>
                Next
              </button>
            </div>
            <div className={css.align_display}>
              <Link to={"/Stats"} className={css.link}>
                <button className={css.manageBtns}>Back</button>
              </Link>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
