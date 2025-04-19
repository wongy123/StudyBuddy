require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User"); // adjust path if needed

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/studybuddy");

        const email = "mod@example.com";
        const userName = "moduser";

        // Check if mod already exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log("❌ Mod already exists:", existing.email);
            process.exit(0);
        }

        // Create mod
        const password = "password";
        const admin = new User({
            userName,
            displayName: "Moderator",
            email,
            password: password,
            degree: "Bachelor of Management",
            role: "moderator",
        });

        await admin.save();
        console.log("✅ Moderator user created:", email);
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to create moderator:", err);
        process.exit(1);
    }
};

createAdminUser();
