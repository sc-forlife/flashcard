import { useState, useEffect, useRef } from "react";
import css from "./alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleQuestion,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function alert({
  message = "Hello World",
  close = () => {},
  isWarning = false,
  isQuestion = false,
  isInformation = false,
  returnTrue = () => {},
  returnFalse = () => {},
}) {
  return (
    <>
      {isWarning ? (
        <div className={css.alertContainer}>
          <FontAwesomeIcon
            className={css.iconSize}
            icon={faTriangleExclamation}
          />
          <h1>Error !</h1>
          <h1>{message}</h1>
          <button className={css.alertButton} onClick={close}>
            close
          </button>
        </div>
      ) : isQuestion ? (
        <div className={css.alertContainer}>
          <FontAwesomeIcon className={css.iconSize} icon={faCircleQuestion} />
          <h1>{message}</h1>
          <div className={css.innerContainer}>
            <button className={css.alertButton} onClick={returnTrue}>
              YES
            </button>
            <button className={css.alertButton} onClick={returnFalse}>
              NO
            </button>
          </div>
        </div>
      ) : isInformation ? (
        <div className={css.alertContainer}>
          <FontAwesomeIcon className={css.iconSize} icon={faCircleInfo} />
          <h1>Information</h1>
          <h1>{message}</h1>
          <button className={css.alertButton} onClick={close}>
            close
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
