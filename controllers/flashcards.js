const FlashcardSet = require('../models/FlashcardSet');
const Flashcard = require('../models/Flashcard');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');


//@desc     Fetch all flashcards from DB
//@path     GET /api/v1/flashcards
//@auth     Public
exports.getFlashcards = asyncHandler(async (req, res, next) => {
    const flashcards = await FlashcardSet.find();

    res
        .status(200)
        .json({
            success: true,
            data: flashcards
        });
});

//@desc     Fetch a single flashcard set by ID
//@path     GET /api/v1/flashcards/:id
//@auth     Public
exports.getFlashcard = asyncHandler(async (req, res, next) => {
    const flashcard = await Flashcard.findById(req.params.id);

    if(!flashcard) {
        return next(new ErrorResponse(`There is no flashcard with the ID of ${req.params.id}`, 404));
    }

    res 
        .status(200)
        .json({
            success: true,
            data: flashcard
        });
});

//@desc     Create a single flashcard 
//@path     POST /api/v1/flashcards
//@auth     Public
exports.createFlashcard = (req, res, next) => {
    try {
        res
            .status(200)
            .json({
                success: true,
                msg: 'Create a new flashcard set'
            });
    } catch (err) {
        res
            .status(400)
            .json({
                success: false,
                msg: err.message
            });
    }
}
