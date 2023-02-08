import { Request, Response } from "express";

export const uploadPhoto = async (req: Request, res: Response) => {
    res.send({
        message: "File uploaded successfully",
        data: req.file?.path,
    })
};