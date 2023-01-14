const express = require("express");
const { NoteModel } = require("../models/Notes.model");

const notesRouter = express.Router();

// G E T
notesRouter.get("/", (req, res) => {
  res.send("All Notes ");
});

// P O S T
notesRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send({ msg: "Note Created" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

// P A T C H
notesRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.find({ _id: id });
  const userID_in_note = note[0].userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You Are Not Authorised" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("updated the Note");
    }
  } catch (err) {
    res.send({ msg: "Something Went Wrong" });
  }
});

//D E L E T E
notesRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send("Deleted the Note");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

module.exports = {
  notesRouter,
};
