const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.id;
    const dir = path.join(__dirname, `../uploads/profile-pics/${userId}`);

    // Ensure the folder exists
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `profile${ext}`; // Always overwrite same file
    cb(null, filename);
  }
});

const upload = multer({ storage });

module.exports = upload;
