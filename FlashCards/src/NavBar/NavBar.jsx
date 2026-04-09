//This file has been logic checked

import css from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

//when a button is clicked it should hold the color to indicate which part of the app user is in

function NavBar(props) {
  const [isActive, setIsActive] = useState(true);
  const [cardsColor, setCardsColor] = useState("black");
  const [manageTopicColor, setManageTopicColor] = useState("black");
  const [reviseCardsColor, setReviseCardsColor] = useState("black");
  const [StatsColor, setStatsColor] = useState("black");

  useEffect(() => {
    if (props.btnName === "/Cards") {
      setCardsColor("rgba(0, 173, 173, 0.817)");
    } else if (props.btnName === "/ManageTopic") {
      setManageTopicColor("rgba(0, 173, 173, 0.817)");
    } else if (props.btnName === "/ReviseCards") {
      setReviseCardsColor("rgba(0, 173, 173, 0.817)");
    } else if (props.btnName === "/Stats") {
      setStatsColor("rgba(0, 173, 173, 0.817)");
    }
  }, []);

  return (
    <>
      <div className={css.nav_container}>
        <Link to={"/ManageTopic"} className={css.link}>
          <button
            style={{ backgroundColor: manageTopicColor }}
            className={css.navButton}
          >
            Manage Topics
          </button>
        </Link>
        <Link to={"/Cards"} className={css.link}>
          <button
            style={{ backgroundColor: cardsColor }}
            className={css.navButton}
          >
            Manage Cards
          </button>
        </Link>
        <Link to={"/ReviceCards"} className={css.link}>
          <button
            style={{ backgroundColor: reviseCardsColor }}
            className={css.navButton}
          >
            Revise
          </button>
        </Link>
        <Link to={"/Stats"} className={css.link}>
          <button
            style={{ backgroundColor: StatsColor }}
            className={css.navButton}
          >
            Stats
          </button>
        </Link>
      </div>
    </>
  );
}

export default NavBar;
