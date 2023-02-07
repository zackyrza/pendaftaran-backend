import { Request, Response } from "express";
import { SECRET_KEY } from "../middleware/auth";
import jwt from "jsonwebtoken";
import db from "../../models";

export const getAll = (req: Request, res: Response) => {
    db.User.findAll({
        where: {
            deletedAt: null,
        }
    }).then((users: any[]) => {
        res.send({
            data: users,
            message: "Users retrieved successfully",
        });
    });
}

export const getOne = (req: Request, res: Response) => {
    db.User.findByPk(req.params.id).then((user: any) => {
        res.send({
            data: user,
            message: "User retrieved successfully",
        });
    });
}

export const create = (req: Request, res: Response) => {
    db.User.findAll({
        where: {
            deletedAt: null,
            email: req.body.email,
        }
    }).then(() => {
        res.send({
            data: null,
            message: "Email already exists",
        });
    }).catch(() => {
        db.User.create({...req.body, deletedAt: null}).then((user: any) => {
            res.send({
                data: user,
                message: "User created successfully",
            });
        });
    });
    
}

export const update = (req: Request, res: Response) => {
    db.User.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).then((user: any) => {
        res.send({
            data: user,
            message: "User updated successfully",
        });
    });
}

export const remove = (req: Request, res: Response) => {
    db.User.update({ deletedAt: new Date() }, {
        where: {
            id: req.params.id,
        },
    }).then((user: any) => {
        res.send({
            data: user,
            message: "User deleted successfully",
        });
    });
}

export const login = (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        res.send({
            data: null,
            message: "Email and password are required",
        });
        return;
    }

    db.User.findOne({
        where: {
            email: req.body.email,
        },
    }).then(async (user: any) => {
        if (user) {
            const hashPassword = await db.User.hashPassword(req.body.password);
            if (db.User.isValidPassword(hashPassword, req.body.password)) {
                const token = jwt.sign({ _id: user.id?.toString(), email: user.email }, SECRET_KEY, {
                    expiresIn: '1 days',
                });
                res.send({
                    data: user,
                    token,
                    message: "User logged in successfully",
                });
            } else {
                if (user.role !== "admin" && req.body.isCMS) {
                    res.send({
                        data: null,
                        message: "Only admin can logged in",
                    });
                    return;
                }
                res.send({
                    data: null,
                    message: "Invalid password",
                });
            }
        } else {
            res.send({
                data: null,
                message: "User not found",
            });
        }
    });
}
