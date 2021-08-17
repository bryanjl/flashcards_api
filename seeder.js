const mongoose = require('mongoose');
const Flashcard = require('./models/flashcard');
const connectDB = require('./config/db');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// console.log(process.env.MONGODB_URI)

const seedDB = async() => {

    const rawData = fs.readFileSync('./_data/flashcards.json');
    const parseData = JSON.parse(rawData);

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });
        
        await Flashcard.create(parseData);

        console.log('DATA IMPORTED');

    } catch (err) {
        console.log(err);
    }
}


// console.log(parseData);

//connectDB();

seedDB();


