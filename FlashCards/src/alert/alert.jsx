import { useState, useEffect, useRef } from "react";
import css from "./alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleInfo,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function alert({ message = "Hello World" }) {
  return (
    <>
      <div className={css.alertContainer}>
        <h1>{message}</h1>
        <FontAwesomeIcon className={css.iconSize} icon={faCircleInfo} />
      </div>
    </>
  );
}
