
const mongoose = require('mongoose');

// Définir le modèle User
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role:{
        type:String
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);;

