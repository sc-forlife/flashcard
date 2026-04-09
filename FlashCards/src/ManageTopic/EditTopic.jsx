//This file has been logic checked and commented

import { Link, useParams } from "react-router-dom";
import css from "../ManageCards/manageCards.module.css";
import { useState, useEffect, useContext } from "react";
import { userCards } from "../App";
import NavBar from "../NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileCircleXmark,
  faFilePen,
  faCircleArrowLeft,
  faCircleArrowRight,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function EditTopic() {
  const PORT = useContext(userCards);
  const topicId = useParams(); //object {id}
  const [topic, setTopic] = useState("");

  const getEdiTopic = async () => {
    try {
      const response = await fetch(
        `${PORT}/topics/manageTopics/editGet/${topicId.id}`,
      );
      if (response.ok) {
        const [responseData] = await response.json();
        setTopic(responseData.topic);
      }
    } catch (err) {
      console.error(err, "Something went wrong");
    }
  };

  useEffect(() => {
    getEdiTopic();
  }, []);

  const handleQuestion = (e) => {
    setTopic((t) => (t = e.target.value));
  };

  //Save the editted state into the db
  const handleTopicEdit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const response = await fetch(
          `${PORT}/topics/manageTopics/${topicId.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic }),
          },
        );
        if (response.ok) {
          const responseData = await response.json();
          setTopic("");
          alert(responseData.message);
        }
      } catch (err) {
        console.error(err, "Something went wrong");
      }
    })();
  };

  return (
    <>
      <div className={css.App_container}>
        <NavBar btnName="/ManageTopic" />
        <div className={css.align_display}>
          <form onSubmit={handleTopicEdit} id="editForm">
            <div className={css.card_display}>
              <h1 className={css.Title}>Edit Topic</h1>
              <div className={css.topic_container}>
                <label className={css.Label}>
                  Topic Name
                  <input
                    className={css.Inputs}
                    placeholder="Enter topic name ..."
                    value={topic}
                    onChange={handleQuestion}
                    required
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className={css.align_display_btns}>
          <Link to={`/ManageTopic`} className={css.link}>
            <button className={`${css.manageBtns} ${css.returnBtn}`}>
              Back
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
          <div className={css.manageBtns_arrange}>
            <button className={css.manageBtns} type="submit" form="editForm">
              Update
              <FontAwesomeIcon icon={faFilePen} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
