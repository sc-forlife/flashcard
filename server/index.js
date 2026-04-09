import express from "express";
import sql2 from "mysql2/promise";
import cors from "cors";
import topicRoute from "./routes/topics.js";
import cardsRoute from "./routes/cards.js";
import statsRoute from "./routes/stats.js";

const app = express();
const db = await sql2.createPool({
  host: "localhost",
  user: "root",
  password: "Salem2003",
  database: "flashcards",
});

app.use(cors());
app.use("/topics", topicRoute);
app.use("/cards", cardsRoute);
app.use("/stats", statsRoute);

app.get(`/test`, (req, res) => {
  res.status(200).json({ message: `Server is working: ${req.originalUrl}` });
});

app.listen(5000, () => {
  console.log("Port 5000 listening");
});

export default db;
