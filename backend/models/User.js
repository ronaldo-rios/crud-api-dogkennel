
const mongoose = require('../database/connection');
const {Schema} = mongoose

const User = mongoose.model(
    'User', 
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        phone: {
            type: String,
            required: true
        }

    // timestamps creates createdAt and updatedAt columns:    
    }, {timestamps: true})
)



module.exports = User