const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);