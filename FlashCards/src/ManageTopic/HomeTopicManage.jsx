//This file has been logic checked and commented

import { useEffect, useState } from "react";
import { useContext } from "react";
import { userCards } from "../App";
import NavBar from "../NavBar/NavBar";
import css from "../ManageCards/manageCards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileCircleXmark,
  faFilePen,
  faCircleArrowLeft,
  faCircleArrowRight,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function HomeTopicManage() {
  const PORT = useContext(userCards);
  const [topics, setTopics] = useState([{}]);
  const [index, setIndex] = useState(0);
  let displayTopics = topics[index];

  const getTopics = async () => {
    try {
      const response = await fetch(`${PORT}/topics/manageTopics/${null}`); //Null due to Get End point Api has no use for it
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
  }, []);

  const handleNext = () => {
    if (index < topics.length - 1) {
      setIndex((i) => i + 1);
    } else {
      alert("Last card reached");
    }
  };

  const handlePrevious = () => {
    index > topics.length - topics.length
      ? setIndex((i) => i - 1)
      : alert("First card reached");
  };

  const handleDelete = (id) => {
    //delete the card from the database

    const answer = prompt(
      "You are about to delete the Topic with all its related cards , Would you like to proceed",
    )
      .toLowerCase()
      .toString();
    if (answer !== "yes") {
      return null;
    }
    (async () => {
      try {
        const response = await fetch(
          `${PORT.current}/topics/manageTopics/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.ok) {
          const responseData = await response.json();
          getTopics();
          alert(responseData.message);
        }
      } catch (err) {
        console.error(err, "Someting Went Wrong");
      }
    })();
  };

  return (
    <>
      <div className={css.App_container}>
        <NavBar btnName="/ManageTopic" />
        {/* prevent rendering undefined data */}
        {topics.length ? (
          <>
            <div className={css.align_display}>
              <button className={css.next_prev_btn} onClick={handlePrevious}>
                <FontAwesomeIcon
                  className={css.arrow_display}
                  icon={faCircleArrowLeft}
                />
              </button>
              <div className={css.card_display}>
                <h1 className={css.title}>Topics</h1>
                <div className={css.topic_container}>
                  <h1>{displayTopics.topic}</h1>
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
              <Link className={css.link} to={"/"}>
                <button className={`${css.returnBtn} ${css.manageBtns}`}>
                  Home
                  <FontAwesomeIcon icon={faHome} />
                </button>
              </Link>
              <div className={css.manageBtns_arrange}>
                <Link className={css.link} to={`/AddTopic`}>
                  <button className={css.manageBtns}>
                    Add
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                  </button>
                </Link>
                <Link
                  className={css.link}
                  to={`/EditTopic/${displayTopics.topicId}`}
                >
                  <button className={css.manageBtns}>
                    Edit
                    <FontAwesomeIcon icon={faFilePen} />
                  </button>
                </Link>
                <button
                  className={css.manageBtns}
                  onClick={() => handleDelete(displayTopics.topicId)}
                >
                  Delete
                  <FontAwesomeIcon icon={faFileCircleXmark} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={css.card_display}>
              <h1 className={css.title}>Topics</h1>
              <div className={css.topic_container}>
                <p>There no topics avalaible , Please Add topics</p>
              </div>
            </div>
            <div className={css.align_display}>
              <Link to={"/"}>
                <button>Home</button>
              </Link>
              <Link to={`/AddTopic`}>
                <button>Add Topic</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
