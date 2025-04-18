require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User"); // adjust path if needed

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/studybuddy");

        const email = "admin@example.com";
        const userName = "adminuser";

        // Check if admin already exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log("❌ Admin already exists:", existing.email);
            process.exit(0);
        }

        // Create admin
        const password = "password";
        const admin = new User({
            userName,
            displayName: "Administrator",
            email,
            password: password,
            degree: "Master of Management",
            role: "admin",
        });

        await admin.save();
        console.log("✅ Admin user created:", email);
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to create admin:", err);
        process.exit(1);
    }
};

createAdminUser();
