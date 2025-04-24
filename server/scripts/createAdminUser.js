require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User");

const createAdminUser = async () => {
  try {
    // Parse arguments
    const [,, userNameArg, emailArg, passwordArg] = process.argv;

    if (!userNameArg || !emailArg || !passwordArg) {
      console.error("❌ Please provide userName, email, and password as arguments.");
      console.error("👉 Usage: node createAdmin.js adminuser admin@example.com mysecurepassword");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/studybuddy");

    // Check if admin already exists (by email or userName)
    const existing = await User.findOne({ 
        $or: [{ email: emailArg }, { userName: userNameArg }] 
    });
    
    if (existing) {
        console.log("❌ Admin already exists:", existing.email || existing.userName);
        process.exit(0);
    }

    // Create admin
    const admin = new User({
      userName: userNameArg,
      displayName: userNameArg,
      email: emailArg,
      password: passwordArg,
      degree: "Master of Management",
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created:", emailArg);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
};

createAdminUser();
