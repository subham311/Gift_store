import multer from 'multer'
import path from 'path'

// Ensure images directory exists
const imagesDir = path.join(process.cwd(), 'images')


// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'gift-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = allowedTypes.test(file.mimetype)

        if (extname && mimetype) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'))
        }
    }
})

export { upload, imagesDir }