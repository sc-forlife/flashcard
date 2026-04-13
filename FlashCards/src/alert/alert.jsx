import { useState, useEffect, useRef } from "react";
import css from "./alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleInfo,
  faCircleQuestion,
  faHome,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function alert({
  message = "Hello World",
  close = function () {},
}) {
  const [isWarning, setIsWarning] = useState(true);
  const [isQuestion, setIsQuestion] = useState(false);
  const [isInformation, setIsInformation] = useState(false);

  return (
    <>
      {isWarning ? (
        <div className={css.alertContainer}>
          <h1>{message}</h1>
          <FontAwesomeIcon
            className={css.iconSize}
            icon={faTriangleExclamation}
          />
          <button className={css.alertButton} onClick={close}>
            close
          </button>
        </div>
      ) : isQuestion ? (
        <div className={css.alertContainer}>
          <h1>{message}</h1>
          <FontAwesomeIcon className={css.iconSize} icon={faCircleQuestion} />
        </div>
      ) : isInformation ? (
        <div className={css.alertContainer}>
          <h1>{message}</h1>
          <FontAwesomeIcon className={css.iconSize} icon={faCircleInfo} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
