//This file has been logic checked and commented

import { useState, useEffect, useContext } from "react";
import css from "../ManageCards/manageCards.module.css";
import Nav from "../NavBar/NavBar";
import { userCards } from "../App";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileCircleXmark,
  faFilePen,
  faCircleArrowLeft,
  faCircleArrowRight,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function ReviceCards() {
  const PORT = useContext(userCards);
  const [topics, setTopic] = useState([{}]);

  const getCards = async () => {
    try {
      const response = await fetch(`${PORT}/topics/manageTopics/${null}`); //null , Get End point API has no use for it
      if (response.ok) {
        const responseData = await response.json();
        setTopic(responseData);
      }
    } catch (err) {
      console.error(err, "Something Went Wrong");
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <div className={css.App_container}>
        <Nav btnName="/ReviseCards" />
        <div className={css.card_display}>
          <h2 className={css.title}>Select topic to revise</h2>
          {topics.map((topic) => {
            //Prevent mapping JSX to escape the unique key prop error
            if (topic.topicId === undefined) {
              return;
            }
            return topic.cards ? (
              <div className={css.topic_container} key={topic.topicId}>
                <Link
                  to={`/ReviceQuestion/${topic.topicId}/${0}`}
                  className={css.Link}
                >
                  <h2>{topic.topic}:</h2>
                  <h2>{topic.cards}</h2>
                </Link>
              </div>
            ) : (
              <div
                onClick={() => alert(`${topic.topic} has no accessible cards`)}
                className={css.topic_container}
                key={topic.topicId}
              >
                <div className={css.Link}>
                  <h2>{topic.topic}:</h2>
                  <h2>{topic.cards}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <Link to={"/"} className={css.link}>
          <button className={css.manageBtns}>
            Home <FontAwesomeIcon icon={faHome} />
          </button>
        </Link>
      </div>
    </>
  );
}
