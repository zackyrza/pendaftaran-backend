import { Request, Response } from "express";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.Class.findAll({
        include: { all: true, nested: true },
        where: {
            deletedAt: null,
        },
        order: [
            ['id', 'ASC'],
        ],
    }).then((classes: any[]) => {
        res.send({
            data: classes,
            message: "Classes retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.Class.findOne({
        include: { all: true, nested: true },
        where: {
            id: req.params.id,
            deletedAt: null,
        }
    }).then((updated: any) => {
        res.send({
            data: updated,
            message: "Class retrieved successfully",
        });
    });
}

export const getAllBySportId = (req: Request, res: Response) => {
    db.Class.findAll({
        include: { all: true, nested: true },
        where: {
            sportId: req.params.id,
            deletedAt: null,
        },
        order: [
            ['createdAt', 'ASC'],
        ]
    }).then((updated: any) => {
        res.send({
            data: updated,
            message: "Classes retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.Class.create({...req.body, deletedAt: null}).then((updated: any) => {
        res.send({
            data: updated,
            message: "Class created successfully",
        });
    });
}

export const update = (req: Request, res: Response) => {
    db.Class.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then((updated: any) => {
        res.send({
            data: updated,
            message: "Class updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.Class.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((updated: any) => {
        res.send({
            data: updated,
            message: "Class deleted successfully",
        });
    });
}
