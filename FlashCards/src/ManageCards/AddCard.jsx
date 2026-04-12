//This file has been logic checked and commented

import { useState } from "react";
import css from "./manageCards.module.css";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { userCards } from "../App";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileCirclePlus,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function AddCard() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const PORT = useContext(userCards);
  const topicId = useParams(); //object {id}

  const handleQuestion = (e) => {
    setQuestion((q) => (q = e.target.value));
  };

  const handleAnswer = (e) => {
    setAnswer((a) => (a = e.target.value));
  };

  const handleAdd = (e) => {
    //Adding card to a database with paramater as topic iD
    e.preventDefault();
    (async () => {
      try {
        const response = await fetch(
          `${PORT}/cards/manageCards/${topicId.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, answer }),
          },
        );
        if (response.ok) {
          const responseData = await response.json();

          //alert user response
          alert(responseData.message);

          handleClear();
        }
      } catch (err) {
        console.error(err, "Something went wrong");
      }
    })();
  };

  const handleClear = () => {
    setAnswer("");
    setQuestion("");
  };

  return (
    <>
      <div className={css.App_container}>
        <NavBar btnName="/Cards" />
        <form onSubmit={handleAdd} id="addForm">
          <div className={css.card_display}>
            <h1 className={css.title}>Add Card</h1>
            <div className={css.topic_container}>
              <label className={css.Label}>
                Question
                <input
                  className={css.Inputs}
                  placeholder="Enter question here ..."
                  value={question}
                  onChange={handleQuestion}
                  required
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
                  required
                />
              </label>
            </div>
          </div>
        </form>
        <div className={css.align_display_btns}>
          <Link to={`/Cards/${topicId.id}`} className={css.link}>
            <button className={`${css.manageBtns} ${css.returnBtn}`}>
              <div>Back</div>
              <div>
                <FontAwesomeIcon icon={faHome} />
              </div>
            </button>
          </Link>
          <div className={css.manageBtns_arrange}>
            <button className={css.manageBtns} type="submit" form="addForm">
              Add
              <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
            <button className={css.manageBtns} onClick={handleClear}>
              Clear
              <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
