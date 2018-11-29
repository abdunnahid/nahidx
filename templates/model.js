const mongoose = require('mongoose');
const Joi = require('Joi');

const userSchema = new mongoose.Schema({
    // email:              { type: String, minlength: 6, maxlength: 255, required: true, lowercase: true, unique: true },
    // mobile:             { type: String, minlength: 11, maxlength: 14, required: true },
    // fName:              { type: String, minlength: 2, maxlength: 50 },
 }
});

const User = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = {
        // email:              Joi.string().min(6).max(255).email().required(),
        // mobile:             Joi.string().min(11).max(14).required(), 
        // fName:              Joi.string().min(2).max(50).required()
    };
    return Joi.validate(user, schema);
};

module.exports.validateUser = validateUser;
module.exports.User = User;