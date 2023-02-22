import { Request, Response } from "express";
import db from "../../models";
import { ICandidate } from "../interfaces/Candidate";

export const getAll = (req: Request, res: Response) => {
    db.Candidate.findAll({
        include: { all: true, nested: true },
        where: {
            deletedAt: null,
        },
        order: [
            ['id', 'ASC'],
        ],
    }).then((candidates: any[]) => {
        res.send({
            data: candidates,
            message: "Candidates retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.Candidate.findOne({
        include: { all: true, nested: true },
        where: {
            id: req.params.id,
            deletedAt: null,
        }
    }).then((candidate: any) => {
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
            deletedAt: null,
        }
    }).then((candidates: any) => {
        res.send({
            data: candidates,
            message: "Candidates retrieved successfully",
        });
    });
}

export const getAllByCity = async (req: Request, res: Response) => {
    let candidates: ICandidate[] = [];

    const finallySend = () => {
        res.send({
            data: candidates,
            message: "Candidates retrieved successfully",
        });
    }

    db.Registration.findAll({
        where: {
            cityId: req.body.cityId,
            deletedAt: null,
        },
        include: [
            {
                as: "class",
                model: db.Class,
                where: {
                    sportId: req.body.sportId,
                    deletedAt: null,
                },
            },
            {
                as: 'candidates',
                model: db.Candidate,
                where: {
                    deletedAt: null,
                },
                include: { all: true, nested: true }
            }
        ]
    }).then(async (registrations: any) => {
        for await (const registration of registrations) {
            if (registration.candidates.length === 0) {
                continue;
            }
            candidates.push(...registration.candidates);
        }
        finallySend();
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