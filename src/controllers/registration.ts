import { Request, Response } from "express";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.Registration.findAll({
        include: { all: true, nested: true },
        where: {
            deletedAt: null,
        },
        order: [
            ['id', 'ASC'],
        ],
    }).then((registrations: any[]) => {
        res.send({
            data: registrations,
            message: "Registrations retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.Registration.findOne({
        include: { all: true, nested: true },
        where: {
            id: req.params.id
        }
    }).then((registration: any) => {
        res.send({
            data: registration,
            message: "Registration retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.Registration.create({...req.body, deletedAt: null}).then((registration: any) => {
        res.send({
            data: registration,
            message: "Registration created successfully",
        });
    });
}

export const update = (req: Request, res: Response) => {
    db.Registration.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then((registration: any) => {
        res.send({
            data: registration,
            message: "Registration updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.Registration.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((registration: any) => {
        res.send({
            data: registration,
            message: "Registration deleted successfully",
        });
    });
}