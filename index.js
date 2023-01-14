const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
const { notesRouter } = require("./routes/Notes.routes");
const { authenticate } = require("./middlewares/authenticate.middleware");
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", notesRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening at port : ${process.env.port}`);
});
