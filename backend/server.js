const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exceptions');
    process.exit(1);
})

// setting up config files
dotenv.config({ path: 'backend/config/config.env' })

//connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle unhandeled promise rejections
process.on('unhandeledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})