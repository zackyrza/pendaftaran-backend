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
            id: req.params.id
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

    db.Class.findAll({
        where: {
            sportId: req.body.sportId,
        }
    }).then((classes: any) => {
        const classIds = classes.map((classItem: any) => classItem.id);
        classIds.forEach((classId: number) => {
            db.Registration.findAll({
                where: {
                    cityId: req.body.cityId,
                    classId,
                }
            }).then((registrations: any) => {
                const registrationIds = registrations.map((registration: any) => registration.id);
                registrationIds.forEach((registrationId: number, index: number) => {
                    db.Candidate.findAll({
                        where: {
                            registrationId,
                        }
                    }).then((candidate: any) => {
                        candidates.push(...candidate);
                        if (index === registrationIds.length - 1 && classId === classIds[classIds.length - 1]) {
                            finallySend();
                        }
                    });
                });
            });
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