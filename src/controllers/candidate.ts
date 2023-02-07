import { Request, Response } from "express";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.Candidate.findAll({
        where: {
            deletedAt: null,
        }
    }).then((candidates: any[]) => {
        res.send({
            data: candidates,
            message: "Candidates retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.Candidate.findByPk(req.params.id).then((candidate: any) => {
        res.send({
            data: candidate,
            message: "Candidate retrieved successfully",
        });
    });
}

export const getAllByRegistration = (req: Request, res: Response) => {
    db.Candidate.findAll({
        where: {
            registrationId: req.params.id,
        }
    }).then((candidates: any) => {
        res.send({
            data: candidates,
            message: "Candidates retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.Candidate.create({...req.body, deletedAt: null}).then((candidate: any) => {
        res.send({
            data: candidate,
            message: "Candidate created successfully",
        });
    });
}

export const update = (req: Request, res: Response) => {
    db.Candidate.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then((candidate: any) => {
        res.send({
            data: candidate,
            message: "Candidate updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.Candidate.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((candidate: any) => {
        res.send({
            data: candidate,
            message: "Candidate deleted successfully",
        });
    });
}