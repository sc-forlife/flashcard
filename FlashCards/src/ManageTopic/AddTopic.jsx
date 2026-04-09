//This file has been logic checked and commented

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import css from "../ManageCards/manageCards.module.css";
import NavBar from "../NavBar/NavBar";
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

export default function AddTopic() {
  const PORT = useContext(userCards);
  const [topicName, setTopicName] = useState("");

  const handleQuestion = (e) => {
    setTopicName((t) => (t = e.target.value));
  };

  //Adding topic in the db
  const handleAddTopic = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const response = await fetch(`${PORT}/topics/manageTopics/${null}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicName }),
        });

        if (response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          setTopicName("");
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
          <form onSubmit={handleAddTopic} id="addTopicForm">
            <div className={css.card_display}>
              <h1 className={css.title}>Add Topics</h1>
              <div className={css.topic_container}>
                <label className={css.Label}>
                  Topic Name
                  <input
                    className={css.Inputs}
                    placeholder="Enter topic name ..."
                    value={topicName}
                    onChange={handleQuestion}
                    required
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className={css.align_display_btns}>
          <Link className={css.link} to={"/ManageTopic"}>
            <button className={`${css.manageBtns} ${css.returnBtn}`}>
              Back
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
          <div className={css.manageBtns_arrange}>
            <button
              className={css.manageBtns}
              type="submit"
              form="addTopicForm"
            >
              Add
              <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
