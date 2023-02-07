import express, { Request, Response } from "express";
import {getAll, getOne, update, create, remove, getAllByRegistration} from "../controllers/candidate";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", auth, (req: Request, res: Response) => {
    getAll(req, res);
});

router.get("/:id", auth, (req: Request, res: Response) => {
    getOne(req, res);
});

router.get("/registration/:id", auth, (req: Request, res: Response) => {
    getAllByRegistration(req, res);
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