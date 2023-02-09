import { Op } from "sequelize";
import db from "../../models";
import { IFirstStepData } from "../interfaces/FirstStepEmail";

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