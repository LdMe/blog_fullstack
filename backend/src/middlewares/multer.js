import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.resolve(), 'public/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const username = req.user.username;
        cb(null, username + '-' + uniqueSuffix + path.extname(file.originalname))

    }
})
const upload = multer({ storage: storage })

export default upload;