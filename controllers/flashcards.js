const Flashcard = require('../models/flashcard');
// const asyncHandler = require('../middleware/async');


//@desc     Fetch all flashcards from DB
//@path     GET /api/v1/flashcards
//@auth     Public
exports.getFlashcards = async(req, res, next) => {
    try {
        const flashcards = await Flashcard.find();

        if(!flashcards){
            res.status(404).json({
                success: false,
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            data: flashcards
        });
    } catch (err) {
        console.log(err)
        next();
    }
}

//@desc     Fetch a single flashcard set by ID
//@path     GET /api/v1/flashcards/:id
//@auth     Public
exports.getFlashcard = (req, res, next)  => {
    try {
        res
            .status(200)
            .json({
                success: true,
                msg: `Get a flashcard set with id of ${req.params.id}`
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
