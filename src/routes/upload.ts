import express, { Request, Response } from "express";
import { uploadPhoto } from "../controllers/upload";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ dest: 'uploads/', storage });

router.post('/', upload.single('file'), (req: Request, res: Response) => {
    uploadPhoto(req, res);
});

export default router;