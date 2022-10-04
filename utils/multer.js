const multer = require('multer');

//Storage type for images
const storage = multer.memoryStorage();

//Init multer
const upload = multer({ storage });

module.exports = { upload };
