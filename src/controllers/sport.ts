import { Request, Response } from "express";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.Sport.findAll({
        include: { all: true, nested: true },
        where: {
            deletedAt: null,
        },
        order: [
            ['id', 'ASC'],
        ],
    }).then((sports: any[]) => {
        res.send({
            data: sports,
            message: "Sports retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.Sport.findByPk(req.params.id).then((sport: any) => {
        res.send({
            data: sport,
            message: "Sport retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.Sport.create({...req.body, deletedAt: null}).then((sport: any) => {
        res.send({
            data: sport,
            message: "Sport created successfully",
        });
    });
}

export const update = (req: Request, res: Response) => {
    db.Sport.update({...req.body, updatedAt: new Date()}, {
        where: {
            id: req.params.id,
        },
    }).then((sport: any) => {
        res.send({
            data: sport,
            message: "Sport updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.Sport.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((sport: any) => {
        res.send({
            data: sport,
            message: "Sport deleted successfully",
        });
    });
}