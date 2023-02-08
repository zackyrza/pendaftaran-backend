import { Request, Response } from "express";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.SportGender.findAll({
        where: {
            deletedAt: null,
        },
        order: [
            ['id', 'ASC'],
        ],
    }).then((sportGenders: any[]) => {
        res.send({
            data: sportGenders,
            message: "SportGenders retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.SportGender.findByPk(req.params.id).then((updated: any) => {
        res.send({
            data: updated,
            message: "SportGender retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.SportGender.create({...req.body, deletedAt: null}).then((updated: any) => {
        res.send({
            data: updated,
            message: "SportGender created successfully",
        });
    });
}

export const update = (req: Request, res: Response) => {
    db.SportGender.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then((updated: any) => {
        res.send({
            data: updated,
            message: "SportGender updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.SportGender.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((updated: any) => {
        res.send({
            data: updated,
            message: "SportGender deleted successfully",
        });
    });
}
