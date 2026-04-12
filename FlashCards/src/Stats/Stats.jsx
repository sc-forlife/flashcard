//This file has been logic checked and commented

import { useState, useEffect, useContext } from "react";
import css from "../ManageCards/manageCards.module.css";
import Nav from "../NavBar/NavBar";
import { userCards } from "../App";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Stats() {
  const PORT = useContext(userCards);
  const [topics, setTopics] = useState([{}]);

  const getTopics = async () => {
    try {
      const response = await fetch(`${PORT}/topics/manageTopics/${null}`);
      if (response.ok) {
        const responseData = await response.json();
        setTopics(responseData);
      }
    } catch (err) {
      console.error(err, "Something Went Wrong");
    }
  };

  useEffect(() => {
    getTopics();
  });

  return (
    <>
      <div className={css.App_container}>
        <Nav btnName="/Stats" />
        <div className={css.card_display}>
          <h2 className={css.title}>Select topic to view stats</h2>
          {topics.map((topics) => {
            //Prevent mapping JSX to escape the unique key prop error
            if (topics.topicId === undefined) {
              return;
            }
            return topics.cards ? (
              <div className={css.topic_container} key={topics.topicId}>
                <Link to={`/StatsCard/${topics.topicId}`} className={css.Link}>
                  <h2>{topics.topic}:</h2>
                  <h2>{topics.cards}</h2>
                </Link>
              </div>
            ) : (
              <div
                onClick={() => alert(`${topics.topic} has no accessible cards`)}
                className={css.topic_container}
                key={topics.topicId}
              >
                <div to={`/StatsCard/${topics.topicId}`} className={css.Link}>
                  <h2>{topics.topic}:</h2>
                  <h2>{topics.cards}</h2>
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
