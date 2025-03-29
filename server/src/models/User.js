const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    degree: {
        type: String,
        required: true,
        trim: true,
    },
    profileBio: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model("User", userSchema);