import { Request, Response } from "express";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.City.findAll({
        include: { all: true, nested: true },
        where: {
            deletedAt: null,
        },
        order: [
            ['id', 'ASC'],
        ],
    }).then((cities: any[]) => {
        res.send({
            data: cities,
            message: "Cities retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.City.findOne({
        include: { all: true, nested: true },
        where: {
            id: req.params.id,
            deletedAt: null,
        }
    }).then((city: any) => {
        res.send({
            data: city,
            message: "City retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.City.create({...req.body, deletedAt: null}).then((city: any) => {
        res.send({
            data: city,
            message: "City created successfully",
        });
    });
}

export const update = (req: Request, res: Response) => {
    db.City.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then((city: any) => {
        res.send({
            data: city,
            message: "City updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.City.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((city: any) => {
        res.send({
            data: city,
            message: "City deleted successfully",
        });
    });
}
