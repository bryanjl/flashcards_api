const mongoose = require('mongoose');

const FlashcardSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        maxLength: [50, 'Title cannot be longer than 50 characters']
    },
    question: {
        type: String,
        required: [true, 'Please add a question'],
        maxLength: [100, 'Question cannot be over 100 characters']
    },
    answers: {
        type: [String],
        required: [true, 'Please add some possible answers']
    },
    correctAnswer: {
        type: String,
        required: [true, 'Please specify the correct answer']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    set: {
        type: mongoose.Schema.ObjectId,
        ref: "FlashcardSet"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);