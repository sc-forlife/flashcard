import express from "express";
import cors from "express";
import db from "../index.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get("/manage/test", (req, res) => {
  res.status(200).json({ message: `Server is working: ${req.originalUrl}` });
});

router
  .route("/manageTopics/:id")
  .get(async (req, res) => {
    try {
      const [results] = await db.query(
        "SELECT t.topicId , t.topic , count(c.topicId) as cards FROM topics t LEFT JOIN cards c ON t.topicId = c.topicId GROUP BY t.topicId",
      );
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(err, "Something went wrong");
    }
  })
  .post(async (req, res) => {
    const name = req.body.topicName;
    try {
      const [results] = await db.query("INSERT INTO topics(topic) VALUE(?)", [
        name,
      ]);
      res.status(200).json({ message: `Topic ${name} has been added` });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .put(async (req, res) => {
    const topicId = req.topicId;
    const topicName = req.body.topic;
    try {
      const [results] = await db.query(
        "UPDATE topics SET topic = ? WHERE topicId = ?",
        [topicName, topicId],
      );
      res.status(200).json({ message: `Topic ${topicId} Updated` });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(err, "Something went wrong");
    }
  })
  .delete(async (req, res) => {
    try {
      const [results] = await db.query("DELETE FROM cards WHERE topicId = ?", [
        req.topicId,
      ]);
      if (results.affectedRows >= 0) {
        const [results] = await db.query(
          "DELETE FROM topics WHERE topicId = ?",
          [req.topicId],
        );
        res
          .status(200)
          .json({ message: `Topic ${req.topicId} and related Cards deleted` });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(err, "Something went wrong");
    }
  });

router.get("/manageTopics/editGet/:id", async (req, res) => {
  const topicId = req.topicId;
  try {
    const [results] = await db.query(
      "SELECT topic FROM topics WHERE topicId = ?",
      [topicId],
    );
    res.status(200).json(results);
  } catch (err) {
    console.log(err, "Something went wrong");
    res.status(500).json({ message: "Soemthing Went Wrong" });
  }
});

router.param("id", (req, res, next, id) => {
  if (!id) {
    res.status(404).json({ message: "Topic Id Not Found" });
  }
  req.topicId = id;
  next();
});

export default router;
