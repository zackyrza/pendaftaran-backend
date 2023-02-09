import express, { Request, Response } from "express";
import {getAll, getOne, update, create, remove, getAllBySportId} from "../controllers/class";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    getAll(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
    getOne(req, res);
});

router.get("/sport/:id", (req: Request, res: Response) => {
    getAllBySportId(req, res);
});

router.post("/", auth, (req: Request, res: Response) => {
    create(req, res);
});

router.put("/:id", auth, (req: Request, res: Response) => {
    update(req, res);
});

router.delete("/:id", auth, (req: Request, res: Response) => {
    remove(req, res);
});
    
export default router;