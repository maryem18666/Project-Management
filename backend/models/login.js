
const mongoose = require('mongoose');

// Définir le modèle User
const login = mongoose.model('login', {
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = login;