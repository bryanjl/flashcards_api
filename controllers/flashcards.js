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
    const flashcard = await FlashcardSet.findOne({ flashcards: { $elemMatch: { _id: req.params.id } } }, { "flashcards.$": 1 });

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

//@desc     Create a flashcard set
//@path     POST /api/v1/flashcards
//@auth     Public
exports.createFlashcardSet = asyncHandler(async (req, res, next) => {
    const flashcard = await Flashcard.create(req.body);

    res
        .status(200)
        .json({
            success: true,
            data: flashcard
        });
});


//@desc     Create a flashcard
//@path     POST /api/v1/flashcards
//@auth     Public
