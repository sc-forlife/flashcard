import express from "express";
import cors from "cors";
import db from "../index.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

const PORT = "/manageStats";

router.get(`${PORT}/addGood/:id`, async (req, res) => {
  const cardId = req.params.id;
  try {
    const [result] = await db.query(
      "UPDATE cards SET good = good + 1 WHERE cardId = ?",
      [cardId],
    );
    res.status(200).json({ message: `Card Graded ${result.affectedRows}` });
  } catch (err) {
    console.log(err, "Something Went Wrong");
    res.status(500).json({ message: `Something Went Wrong` });
  }
});

router.get(`${PORT}/addBad/:id`, async (req, res) => {
  const cardId = req.params.id;
  try {
    const [result] = await db.query(
      "UPDATE cards SET bad = bad + 1 WHERE cardId = ?",
      [cardId],
    );
    res.status(200).json({ message: `Card Graded ${result.affectedRows}` });
  } catch (err) {
    console.log(err, "Something Went Wrong");
    res.status(500).json({ message: `Something Went Wrong` });
  }
});

export default router;
