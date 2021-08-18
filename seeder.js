const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

//environment variables to connect to DB
dotenv.config({ path: './config/config.env' });

//load Models
const FlashcardSet = require('./models/FlashcardSet');
// const Flashcard = require('./models/Flashcard');

//connect to DB
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//seed DB with data
const seedDB = async() => {
    
    //Read JSON data files
    const flashcardsets = JSON.parse(fs.readFileSync('./_data/flashcards.json'));    

    try {        
        await FlashcardSet.create(flashcardsets);

        console.log('DATA IMPORTED');

        process.exit();

    } catch (err) {
        console.log(err);
    }
}

//delete all data from DB
const deleteDB = async() => {
    try {
        await FlashcardSet.deleteMany();
        
        console.log('DATA Removed');

        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if(process.argv[2] === '-i'){
    seedDB();
} else if(process.argv[2] === '-d'){
    deleteDB();
}



