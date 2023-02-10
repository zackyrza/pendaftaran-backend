import { Op } from "sequelize";
import db from "../../models";
import { IFirstStepData } from "../interfaces/FirstStepEmail";
import { ICandidateData, ISecondStepData } from "../interfaces/SecondStepEmail";

export const generateDataForFirstStepEmail = (caborId: number, cityId: number): Promise<IFirstStepData> => {
    return new Promise((resolve, reject) => {
        const sports = db.Sport.findOne({
            where: {
                id: caborId
            },
        });
        const cities = db.City.findOne({
            where: {
                id: cityId
            }
        });
        const classes = db.Class.findAll({
            where: {
                sportId: caborId,
            },
            include: [
                {
                    as: "registrations",
                    model: db.Registration,
                    where: {
                        cityId: cityId,
                        sportGenderId: {
                            [Op.ne]: null,
                        },
                    },
                    include: [
                        {
                            as: "sportGender",
                            model: db.SportGender,
                        },
                    ],
                    required: false,
                }
            ],
        });

        Promise.all([sports, cities, classes]).then((values) => {
            const data = {
                sport: values[0].name,
                city: values[1].name,
                class: values[2].map((item: any) => {
                    const registrations = item.registrations.map((reg: any) => {
                        return {
                            name: reg.sportGender.name,
                            total: reg.quantity,
                        };
                    });
                    return {
                        name: item.name,
                        registrations,
                    };
                }),
            };
            resolve(data);
        });
    });
}

export const generateDataForSecondStepEmail = (classId: number, cityId: number): Promise<ISecondStepData> => {
    return new Promise((resolve, reject) => {
        const city = db.City.findOne({
            where: {
                id: cityId,
            },
        });
        const classType = db.Class.findOne({
            where: {
                id: classId,
            },
            include: [
                {
                    as: "sport",
                    model: db.Sport,
                },
            ],
        });
        const registrations = db.Registration.findAll({
            where: {
                classId: classId,
                cityId: cityId,
                sportGenderId: {
                    [Op.ne]: null,
                },
            },
        });

        Promise.all([city, classType, registrations]).then(async (values) => {
            let candidates: ICandidateData[] = [];
            const afterFetchCandidates = () => {
                resolve({
                    city: values[0].name,
                    className: values[1].name,
                    sport: values[1].sport.name,
                    candidates,
                });
            }
            values[2].map(async (item: any, index: number) => {
                const data = await db.Candidate.findAll({
                    where: {
                        registrationId: item.id,
                    },
                });
                candidates.push(...data);
                if (index === values[2].length - 1) {
                    afterFetchCandidates();
                }
            });
        });
    });
}