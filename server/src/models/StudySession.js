const { default: mongoose } = require("mongoose");
const Comment = require("./Comment");

const studySessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    courseCode: {
        type: String,
        required: false,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
    },
    endTime: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ]
});

studySessionSchema.pre(/^find/, function (next) {
    this.populate("createdBy", "userName displayName")
        .populate("participants", "userName displayName");
    next();
});

studySessionSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    await Comment.deleteMany({ session: this._id });
    next();
  });

module.exports = mongoose.model("StudySession", studySessionSchema);