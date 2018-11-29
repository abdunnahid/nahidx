const express = require('express');
const app = express();


// importing middlewares
const logger = require('./midlewares/logger');

// importing routes
const users = require('./routes/user');

// Database Connection
const db = require('./database');           // singleton object of database connection

// ================= Middlewares ===================
app.use(express.json());                    // Parsing body content to JSON built-in middleware


// ==================== Routes =====================
app.use('/users', users);


// =============== Listening to Port ===============
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening to port 3000...");
});