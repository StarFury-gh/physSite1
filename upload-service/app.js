const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving to /usr/share/nginx/html/images");
        cb(null, '/usr/share/nginx/html/images');
    },
    filename: (req, file, cb) => {
        // Получаем taskId из query-параметров
        const taskId = req.query.taskId;
        if (!taskId) {
            console.error("Task ID is missing in query parameters");
            return cb(new Error('Task ID is required'));
        }
        const ext = path.extname(file.originalname);
        const filename = `${taskId}${ext}`;
        console.log(`Saving file as: ${filename}`);
        cb(null, filename);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Ограничение размера файла
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: false, info: 'No file uploaded' });
    }
    const filename = req.file.filename;
    console.log("File uploaded:", filename);
    res.json({ status: true, filename });
});

app.listen(port, () => {
    console.log(`Upload service running on http://localhost:${port}`);
});