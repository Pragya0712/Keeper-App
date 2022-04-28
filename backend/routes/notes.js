import express from "express";
import Note from "../models/node.model.js";

const router = express.Router();

router.route("/")
    .get((req, res) => {
        Note.find()
            .then(notes => res.json(notes))
            .catch(err => res.status(400).json("Error " + err));
    })

    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;

        const newNote = new Note({title, content});

        newNote.save()
            .then(() => res.json("Note Added!"))
            .catch(err => res.status(400).json("Error " + err));

    })

router.route("/:id")
    .delete((req, res) => {
        Note.findByIdAndDelete(req.params.id)
            .then(() => res.json("Note Deleted!"))
            .catch(err => res.status(400).json("Error " + err));
    })

export default router;