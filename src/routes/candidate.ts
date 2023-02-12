import express, { Request, Response } from "express";
import {getAll, getOne, update, create, remove, getAllByRegistration, getAllByCity} from "../controllers/candidate";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    getAll(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
    getOne(req, res);
});

router.get("/registration/:id", (req: Request, res: Response) => {
    getAllByRegistration(req, res);
});

router.post("/idCard", (req: Request, res: Response) => {
    getAllByCity(req, res);
});

router.post("/", (req: Request, res: Response) => {
    create(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
    update(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
    remove(req, res);
});

export default router;