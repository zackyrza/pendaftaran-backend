import { Op } from "sequelize";
import db from "../../models";
import { IFirstStepData } from "../interfaces/FirstStepEmail";
import { ICandidateData, ISecondStepData } from "../interfaces/SecondStepEmail";
import { ICandidateByCityData, IRegistrationsData } from "../interfaces/CandidateByCityEmail";

export const generateDataForFirstStepEmail = (caborId: number, cityId: number): Promise<IFirstStepData> => {
    return new Promise((resolve, reject) => {
        const sports = db.Sport.findOne({
            where: {
                id: caborId,
                deletedAt: null,
            },
        });
        const cities = db.City.findOne({
            where: {
                id: cityId,
                deletedAt: null,
            }
        });
        const classes = db.Class.findAll({
            where: {
                sportId: caborId,
                deletedAt: null,
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
                        deletedAt: null,
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
                deletedAt: null,
            },
        });
        const classType = db.Class.findOne({
            where: {
                id: classId,
                deletedAt: null,
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
                deletedAt: null,
            },
            include: [
                {
                    as: 'candidates',
                    model: db.Candidate,
                    where: {
                        deletedAt: null,
                    },
                    include: { all: true, nested: true }
                }
            ]
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
            for await (const registration of values[2]) {
                if (registration.candidates.length === 0) {
                    continue;
                }
                candidates.push(...registration.candidates);
            }
            afterFetchCandidates();
        });
    });
}

export const generateDataForCandidatesByCityEmail = (cityId: number): Promise<ICandidateByCityData> => {
    return new Promise((resolve, reject) => {
        const city = db.City.findOne({
            where: {
                id: cityId,
            },
        });
        const classType = db.Class.findAll({
            where: {
                id: cityId,
            },
            include: [
                {
                    as: "sport",
                    model: db.Sport,
                },
            ],
        });

        Promise.all([city, classType]).then(async (values) => {
            let candidates: ICandidateData[] = [];
            let registrations: IRegistrationsData[] = [];

            const afterFetchCandidates = () => {
                const processedData = values[1].map((item: any) => {
                    const classesName = item.name;
                    const sportName = item.sport.name;
                    return {
                        className: classesName,
                        sport: sportName,
                        candidates: candidates.filter((candidate: any) => {
                            return candidate.registration.classId === item.id;
                        }),
                    };
                });
                resolve({
                    city: values[0].name,
                    classes: processedData,
                });
            }

            const afterFetchRegistrations = () => {
                registrations.forEach(async (registration, index) => {
                    const data = await db.Candidate.findAll({
                        where: {
                            registrationId: registration.id,
                            deletedAt: {
                                [Op.eq]: null,
                            },
                        },
                        include: [
                            {
                                as: "registration",
                                model: db.Registration,
                            },
                        ],
                    });
                    candidates.push(...data);
                    if (index === registrations.length - 1) {
                        afterFetchCandidates();
                    }
                });
            }

            values[1].map(async (item: any, index: number) => {
                const data = await db.Registration.findAll({
                    where: {
                        classId: item.id,
                        cityId: cityId,
                        sportGenderId: {
                            [Op.ne]: null,
                        },
                    },
                });
                registrations.push(...data);
                if (index === values[1].length - 1) {
                    afterFetchRegistrations();
                }
            });
        });
    });
}