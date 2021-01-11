const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer')
const path = require('path')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({ origin: "*" }))


const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    fileName: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const type = /jpeg|jpg|png|gif|pdf/
        const extName = type.test(path.extname(file.originalname).toLowerCase())
        const mimType = type.test(file.mimetype)

        if (extName && mimType) {
            cb(null, true)
        } else {
            cb(new Error('Plm occurred..'))
        }
    }
})

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file
    console.log(file.filename)
    if (!file) {
        console.log('Error Bro..')
        return next(error)
    }

    res.send(file)
})

app.post('/download', (req, res, next) => {
    const pathName = path.join(__dirname, './upload') + '/' + req.body.filename
    res.sendFile(pathName)
})

app.get('/', (req, res) => {
    res.json({
        message: "I am ok bro"
    })
})

app.listen(PORT, () => {
    console.log(`Server is ready to run on the port ${PORT}`)
})