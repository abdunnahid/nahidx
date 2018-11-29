const express = require('express');
const router = express.Router();


// Importing models
const { validateUser, User } = require('../models/user-model');


// Get All the users on the database 
router.get('/', async (req, res) => {
    
});

// Get specific user
router.get('/:id', async (req, res) => {
    
});

// Register user
router.put('/register', async (req, res) => {

});

// Update user
router.put('/:id', async (req, res) => {

});

// Delete user
router.delete('/:id', async (req, res) => {

});


module.exports = router;