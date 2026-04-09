//This file has been logic checked and commented

import { useState, useEffect, useContext } from "react";
import css from "./manageCards.module.css";
import NavBar from "../NavBar/NavBar";
import { useParams, Link } from "react-router-dom";
import { userCards } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileCircleXmark,
  faFilePen,
  faCircleArrowLeft,
  faCircleArrowRight,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function EditCard() {
  const PORT = useContext(userCards);
  const cardId = useParams(); //object {id , topicId}
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getCards = async () => {
    try {
      const response = await fetch(
        `${PORT}/cards/manageCards/editCard/${cardId.id}`,
      );
      if (response.ok) {
        const [responseData] = await response.json();
        console.log(responseData);
        setQuestion(responseData.question);
        setAnswer(responseData.answer);
      }
    } catch (err) {
      console.error(err, "Something went wrong");
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const handleQuestion = (e) => {
    setQuestion((q) => (q = e.target.value));
  };

  const handleAnswer = (e) => {
    setAnswer((a) => (a = e.target.value));
  };

  const handleClear = () => {
    setAnswer("");
    setQuestion("");
  };

  const handleEdit = (e) => {
    //Handles the Updating to the database
    e.preventDefault();
    const { id } = cardId; // retrieve cardId from the useParam
    (async () => {
      try {
        const response = await fetch(
          `${PORT}/cards/manageCards/${cardId.topicId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, answer, id }),
          },
        );
        if (response.ok) {
          const responseData = await response.json();
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
        <NavBar btnName="/Cards" />
        <form onSubmit={handleEdit} id="editCard">
          <div className={css.card_display}>
            <h1 className={css.title}>Edit Card</h1>
            <div className={css.topic_container}>
              <label className={css.Label}>
                Question
                <input
                  className={css.Inputs}
                  placeholder="Enter question here ..."
                  value={question}
                  onChange={handleQuestion}
                />
              </label>
            </div>
            <div className={css.topic_container}>
              <label className={css.Label}>
                Answer
                <textarea
                  className={css.Textarea}
                  placeholder="Enter answer here ..."
                  value={answer}
                  onChange={handleAnswer}
                />
              </label>
            </div>
          </div>
        </form>
        <div className={css.align_display_btns}>
          <Link className={css.Link} to={`/Cards/${cardId.topicId}`}>
            <button className={`${css.manageBtns} ${css.returnBtn}`}>
              Back
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
          <div className={css.manageBtns_arrange}>
            <button className={css.manageBtns} type="submit" form="editCard">
              Edit
              <FontAwesomeIcon icon={faFilePen} />
            </button>
            <button className={css.manageBtns} onClick={handleClear}>
              Clear
              <FontAwesomeIcon icon={faFileCircleXmark} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
