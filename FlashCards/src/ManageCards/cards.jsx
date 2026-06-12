//This file has been logic checked and commented

import { useState, useEffect, useContext } from "react";
import css from "./manageCards.module.css";
import Nav from "../NavBar/NavBar";
import { userCards } from "../App";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const PORT = useContext(userCards);
  const [topics, setTopics] = useState([{}]);

  const getTopics = async () => {
    try {
      const response = await fetch(
        `${PORT}/topics/manageTopics/${null}`, // null , Get API EndPoint has no use for it
      );
      if (response.ok) {
        const responseData = await response.json();
        setTopics(responseData);
      }
    } catch (err) {
      console.error(err, "Somethign went wrong");
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <>
      <div className={css.App_container}>
        <Nav btnName="/Cards" />
        <div className={css.card_display} style={{ overflowY: "scroll" }}>
          <h1 className={css.title}>Topics</h1>
          {/* Display add message and add button if no cards are found*/}
          {topics.length !== 0 ? (
            topics.map((topics, index) => {
              //Prevent mapping JSX to escape the unique key prop error
              if (topics.topicId === undefined) {
                return;
              }
              return (
                <div key={topics.topicId} className={css.topic_container}>
                  <Link to={`/Cards/${topics.topicId}`} className={css.Link}>
                    <h2>{topics.topic}:</h2>
                    <h2>{topics.cards}</h2>
                  </Link>
                </div>
              );
            })
          ) : (
            <>
              <p>There are no topics available</p>
              <button>
                <Link to={"/AddTopic"}>Add Topic</Link>
              </button>
            </>
          )}
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
