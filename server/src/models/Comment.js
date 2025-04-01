const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudySession",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

commentSchema.pre(/^find/, function (next) {
    this.populate("user", "userName displayName");
    next();
});

module.exports = mongoose.model("Comment", commentSchema);