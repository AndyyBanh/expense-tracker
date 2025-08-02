const multer = require('multer'); // Import the multer library for handling file uploads

// Configure storage
const storage = multer.diskStorage({
    // Set the destination folder where uploaded files will be stored
    destination: (req, res, cb) => {
         // 'uploads/' is the folder where files will be saved
        cb(null, 'uploads/');
    },
     // Set the filename for uploaded files
    filename: (req, file, cb) => {
        // Rename file using current timestamp + original file name to avoid name conflicts
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to only accept only specific image types
const fileFilter = (req, file, cb) => {
    // Allowed MIME types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    // Check if the file type is allowed
    if (allowedTypes.includes(file.mimetype)) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file and send an error
        cb(new Error('Only .jpeg, .jpg, and .png formats are allowed'), false);
    }
}
// Create the multer instance using the defined storage and file filter
const upload = multer({ storage, fileFilter});

// Export the upload middleware to be used in routes
module.exports = upload;