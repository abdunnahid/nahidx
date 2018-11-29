const express = require('express');
const router = express.Router();

const { sendEmail } = require('../shared/email');

// Importing models
const { validateUserRegistration, validateUserUpdate, User } = require('../models/user-model');
const { Company } = require('../models/company-model');

// Get All the users on the database 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (error) {
        res.send(error);
    }
});

// Get specific user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.send(error.message);
    }
});

// Verify invitation code
router.post('/verifyInvitation', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        
        if (!user || user.invitationCode != req.body.invitationCode) {
            return res.status(400).send("Invalid email or invitation code!");
        };
        res.send(user);
    } 
    catch (error) {
        res.send(error.message);
    };
});

// Register user
router.put('/register', async (req, res) => {

    // checking if the input is valid
    const userValidation = validateUserRegistration(req.body);
    if (userValidation.error) {
        // 400 Bad Request
        return res.status(400).send(userValidation.error.details[0].message);
    };

    // Checking - if the user exists
    let userExistingInfo = {};
    try {
        userExistingInfo = await User.findOne({ email: req.body.email });
        if (!userExistingInfo) {
            return res.status(400).send("Invalid email or invitation code!");
        }
    }
    catch (error) {
        return res.send(error.message);
    }

    // verifying the invitation code
    if (userExistingInfo.invitationCode != req.body.invitationCode) {
        return res.status(404).send("Invalid email or invitation code!");
    }
    // Checking - if the user is already registerd and also not deleted from other company
    else if(userExistingInfo.isRegistered && !userExistingInfo.isDeleted) {
        return res.status(404).send("You are already registered to a company! Please login.");
    };

    let userToRegister = {
        fName:          req.body.fName,
        lName:          req.body.lName,
        employeeId:     req.body.employeeId,
        mobile:         req.body.mobile,
        deviceId:       req.body.deviceId,
        email:          req.body.email,
        password:       req.body.password,
        isActive:       true,
        isRegistered:   true,
    };

    // Updating user information
    try {
        const user = await User.findByIdAndUpdate(
            userExistingInfo._id,
            userToRegister,
            { new: true }
        );
        res.send(user);
    }
    catch (error) {
        res.send(error.message);
    }
});

// Update user
router.put('/:id', async (req, res) => {

    // checking if the input is valid
    let userValidation = validateUserUpdate(req.body);
    if (userValidation.error) {
        // 400 Bad Request
        return res.status(400).send(userValidation.error.details[0].message);
    }

    // Updating the document
    const userToUpdate = {
        fName: req.body.fName,
        lName: req.body.lName,
        mobile: req.body.mobile, // We Can use (npm i joi-phone-number)
        deviceId: req.body.deviceId,
        dob: req.body.dob,
        isProfileCompleted: true // Profile is now complete
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            userToUpdate,
            { new: true }
        );
        // Checking if the documented was FOUND or Updated
        if (!user) {
            // 404 Not Found
            return res.status(404).send("The user with the given id was not found!");
        };
        res.send(user);
    }
    catch (error) {
        res.send(error.message);
    }

});

// Delete user
router.delete('/:id', async (req, res) => {
    // Deleting the document
    const user = await User.findByIdAndRemove(req.params.id);

    // Checking if the documented was FOUND or Updated
    if (!user) {
        // 404 Not Found
        return res.status(404).send("The user with the given id was not found!");
    };

    res.send(user);
});


module.exports = router;