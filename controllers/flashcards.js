
//@desc     Fetch all flashcards from DB
//@path     GET /api/v1/flashcards
//@auth     Public
exports.getFlashcards = (req, res, next) => {
    try {
        res 
            .status(200)
            .json({
                success: true,
                msg: 'Route to get all flashcards'
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
