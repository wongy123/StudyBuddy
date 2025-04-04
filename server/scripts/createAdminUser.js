require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User"); // adjust path if needed
const bcrypt = require("bcrypt");

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "admin@example.com";
        const userName = "adminuser";

        // Check if admin already exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log("❌ Admin already exists:", existing.email);
            process.exit(0);
        }

        // Create admin
        const hashedPassword = await bcrypt.hash("password", 10);
        const admin = new User({
            userName,
            displayName: "Administrator",
            email,
            password: hashedPassword,
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
