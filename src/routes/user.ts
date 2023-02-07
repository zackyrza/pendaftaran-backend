import express, { Request, Response } from "express";
import {getAll, getOne, update, create, remove, login} from "../controllers/user";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", auth, (req: Request, res: Response) => {
    getAll(req, res);
});

router.get("/:id", auth, (req: Request, res: Response) => {
    getOne(req, res);
});

router.post("/", (req: Request, res: Response) => {
    create(req, res);
});

router.put("/:id", auth, (req: Request, res: Response) => {
    update(req, res);
});

router.delete("/:id", auth, (req: Request, res: Response) => {
    remove(req, res);
});

router.post("/login", (req: Request, res: Response) => {
    login(req, res);
});

export default router;