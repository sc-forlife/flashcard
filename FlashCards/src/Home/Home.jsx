import css from "../ManageCards/manageCards.module.css";
import cssHome from "./home.module.css";
import NavBar from "../NavBar/NavBar";
import Alert from "../alert/alert";
import { useState } from "react";

export default function home() {
  const [isShowAlert, setIsShowAlert] = useState(false);
  return (
    <>
      <div
        style={{ width: "99vw", height: "99vh" }}
        className={css.App_container}
      >
        <NavBar />
        {isShowAlert ? (
          <Alert close={() => setIsShowAlert(false)} message={"How are you"} />
        ) : null}
        <div className={cssHome.centerDiv}>
          <h1 className={cssHome.welcomeHome}>Welcome to the Flashcard App</h1>
        </div>
        <button onClick={() => setIsShowAlert(true)}>alert</button>
      </div>
    </>
  );
}
