const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please add a question'],
        maxLength: [100, 'Question cannot be over 100 characters']
    },
    answers: {
        type: [String],
    },
    correctAnswer: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);