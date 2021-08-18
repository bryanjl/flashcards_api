const mongoose = require('mongoose');

//require the schema to allow in this model
const Flashcard = require('./Flashcard').schema;

const FlashcardSetSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        maxLength: [50, 'Title cannot be longer than 50 characters']
    },
    flashcards: {
        type: [ Flashcard ]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('FlashcardSet', FlashcardSetSchema);