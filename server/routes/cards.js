import db from "../index.js";
import express from "express";
import cors from "express";

const router = express.Router();

router.use(cors());
router.use(express.json());

router
  .route("/manageCards/:topicId")
  .get(async (req, res) => {
    try {
      const [results] = await db.query(
        "SELECT * FROM cards WHERE topicId = ?",
        [req.topicId],
      );
      res.status(200).json(results);
    } catch (err) {
      console.log(err, "Something went wrong");
      res.status(500).json({ message: "Something went wrong" });
    }
  })
  .post(async (req, res) => {
    const { question, answer } = req.body;

    try {
      const [results] = await db.query(
        "INSERT INTO cards (topicId,question,answer,good,bad) Values(?,?,?,?,?)",
        [req.topicId, question, answer, 0, 0],
      );
      res.status(200).json({ message: `Card Created` });
    } catch (err) {
      console.log(err, "Something went wrong");
      res.status(500).json({ message: "Something went wrong" });
    }
  })
  .put(async (req, res) => {
    const { question, answer, id } = req.body;

    try {
      const [results] = await db.query(
        "UPDATE cards SET question = ? , answer = ? WHERE cardId = ?",
        [question, answer, id],
      );
      res.status(200).json({ message: `Card ${id} Updated` });
    } catch (err) {
      res.status(500).json({ message: "Something Went wrong" });
      console.log(err, "Something went wrong");
    }
  })
  .delete(async (req, res) => {
    const cardId = req.body.id;
    try {
      const [results] = await db.query(`DELETE FROM cards WHERE cardId = ?`, [
        cardId,
      ]);
      console.log(results);
      res.status(200).json({ message: "Card Deleted" });
    } catch (err) {
      res.status(500).json({ message: "Something Went wrong" });
      console.log(err, "Something went wrong");
    }
  });

router.get("/manageCards/editCard/:cardId", async (req, res) => {
  const cardId = req.params.cardId;
  try {
    const [result] = await db.query("SELECT * FROM cards WHERE cardId = ?", [
      cardId,
    ]);
    res.status(200).json(result);
  } catch (err) {
    console.log(err, "Something Went Wrong");
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

router.param("topicId", (req, res, next, topicId) => {
  //Call this middleware for each topicId params
  if (!topicId) {
    res.status(404).json({ message: "Topic Id is not found" });
  }
  req.topicId = topicId;
  next();
});

export default router;
