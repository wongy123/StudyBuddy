require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User");

const createModeratorUser = async () => {
  try {
    // Parse arguments
    const [,, userNameArg, emailArg, passwordArg] = process.argv;

    if (!userNameArg || !emailArg || !passwordArg) {
      console.error("❌ Please provide userName, email, and password as arguments.");
      console.error("👉 Usage: node createModeratorUser.js moduser mod@example.com mysecurepassword");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/studybuddy");

    // Check if user already exists by email or userName
    const existing = await User.findOne({ 
      $or: [{ email: emailArg }, { userName: userNameArg }] 
    });

    if (existing) {
      console.log("❌ Moderator already exists:", existing.email || existing.userName);
      process.exit(0);
    }

    // Create moderator
    const moderator = new User({
      userName: userNameArg,
      displayName: userNameArg,
      email: emailArg,
      password: passwordArg,
      degree: "Bachelor of Management",
      role: "moderator",
    });

    await moderator.save();
    console.log("✅ Moderator user created:", emailArg);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create moderator:", err);
    process.exit(1);
  }
};

createModeratorUser();
