const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//bring in project files
const flashcards = require('./routes/flashcards');

//load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//body parser for JSON
app.use(express.json());

//logger for development use
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/flashcards', flashcards);

//Port Assignment
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running on port ${PORT}`));

//unhandled promise rejections handler
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`);
    //close the server
    server.close(() => process.exit(1));
});