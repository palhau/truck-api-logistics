const Note = require('../models/models.js/index.js');

// Create and Save a new Note
exports.create = (req, res) => {
  // Validade request
  if( !req.body.content){
    return res.status(400).send ({
      message:"Note content can note be empty"
    });
  }

  //Create a Note
  const note = new Note ({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });

  //Save Note in the database
  note.save()
  .then( data => {
    res.send(data);
  }).catch( err => {
    res.status(500).send({
      message: err.message || "Some error ocurred while creating the note."
    });
  });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
  .then( notes => {
    res.send(notes);
  }).catch( err => {
    res.status(500).send({
      message: err.message || "Some error ocurred while retrieving the notes."
    });
  });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
  .then( note => {
    if( !note ) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    res.send(note);
  }).catch( err => {
    if( err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Note nopt found with id " + req.params.noteId
      });
    }
    return res.status(500).send({
      message: "Error retrieving note with id " + req.params.noteId
    });
  });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  //Validade request
  if( !req.body.content ){
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  //Find a note and update it with the request body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
  }, {new:true})
  .then( note => {
    if( !note ){
      return res.status(404).send({
        message: "Note note found with id " + req.params.noteId
      });
    }
    res.send(note);
  }).catch( err => {
    if( err.kind === 'ObjectId' ){
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    return res.status(500).send({
      message: "Erro updating note with id " + req.params.noteId
    });
  });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndDelete(req.params.noteId)
  .then( note => {
    if( !note ){
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    res.send({message: "Note deleted Sucessfully!"});
  }).catch( err => {
    if( err.kind === 'ObjectId' || err.name === 'NotFound' ){
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }
    return res.status(500).send({
      message: "Could not delete note with id " + req.params.noteId
    });
  });
};