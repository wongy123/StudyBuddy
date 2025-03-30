const expressAsyncHandler = require("express-async-handler");
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
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    degree: {
        type: String,
        required: true,
        trim: true,
    },
    profileBio: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
    },
});

userSchema.pre("save", { document: true, query: false }, asyncHandler(async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}));

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d", }
    );
}

module.exports = mongoose.model("User", userSchema);