var mongoose = require('mongoose');

// CONNECT TO DB
const mongoURI = 'mongodb://localhost/socialNetwork';
const MONGOLAB_URI = process.env.MONGOLAB_URI;
const dbURI = (process.env.NODE_ENV === 'production') ? MONGOLAB_URI:mongoURI;
console.log('dbURI = ' + dbURI);
mongoose.connect(dbURI,{ useNewUrlParser: true } );



// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(() => {
        var m = 'Mongoose disconnected through ' + msg + '.';
        console.log('='.repeat(m.length));
        console.log(m);
        console.log('='.repeat(m.length));
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => { 
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => {
        process.exit(0);
    });
});


// BRING IN SCHEMAS & MODELS
require('./posts');
require('./users');