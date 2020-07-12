const express = require('express');
const noteRouter = express.Router();
const {createNote, deleteNote, saveNote } = require('../databaseQueries');

noteRouter.post('/createNote', async(req,res) => {
    const {uuid,noteName,date} = req.body;
    await createNote(uuid, date, noteName);
    res.sendStatus(201);
});

noteRouter.post('/deleteNote',async(req,res) => {
    const noteId = req.body.noteId;
    await deleteNote(noteId);
    res.sendStatus(200);
});

noteRouter.post('/saveNote', async(req,res) => {
    const {noteId, title, content} = req.body;
    await saveNote(noteId, title, content);
    res.sendStatus(200);
}); 

module.exports = noteRouter;