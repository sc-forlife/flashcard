//This file has been logic checked and commented

import { useState, useEffect, useContext, useRef } from "react";
import css from "../ManageCards/manageCards.module.css";
import Nav from "../NavBar/NavBar";
import { userCards } from "../App";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Alert from "../alert/alert";

export default function ReviceCards() {
  const PORT = useContext(userCards);
  const [topics, setTopic] = useState([{}]);
  const [isShowAlert, setIsShowAlert] = useState(false);
  let alertMessage = useRef("");

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
        {isShowAlert ? (
          <Alert
            message={alertMessage.current}
            isWarning={true}
            close={() => {
              setIsShowAlert(false);
            }}
          />
        ) : null}
        <div className={css.card_display} style={{ overflowY: "scroll" }}>
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
                onClick={() => {
                  alertMessage.current = `${topic.topic} has no accessible cards`;
                  setIsShowAlert(true);
                }}
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
