import { useState, useEffect } from "react";
import css from "./card.module.css";

export default function Card(props) {
  console.log(props.renderThis);
  return (
    <>
      <div className={css.card_display}>
        <h1 className={css.title}>{props.topic}</h1>
        {props.renderThis.map((obj) => {
          return obj;
        })}
      </div>
    </>
  );
}
