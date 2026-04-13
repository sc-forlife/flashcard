import css from "../ManageCards/manageCards.module.css";
import cssHome from "./home.module.css";
import NavBar from "../NavBar/NavBar";
import Alert from "../alert/alert";

export default function home() {
  return (
    <>
      <div
        style={{ width: "99vw", height: "99vh" }}
        className={css.App_container}
      >
        <NavBar />
        <Alert />
        <div className={cssHome.centerDiv}>
          <h1 className={cssHome.welcomeHome}>Welcome to the Flashcard App</h1>
        </div>
      </div>
    </>
  );
}
