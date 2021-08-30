const express = require('express');
//get controller methods - flashcards
const {
    getFlashcards,
    getFlashcard,
    createFlashcardSet
} = require('../controllers/flashcards');

//use express router
const router = express.Router();


//@route /api/v1/flashcards
//GET and POST routes

//get all flashcards route
router
    .route('/')
    .get(getFlashcards)
    .post(createFlashcardSet);

//get flashcard set by id
router
    .route('/:id')
    .get(getFlashcard)


module.exports = router;
