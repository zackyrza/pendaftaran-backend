import { ICandidateData } from "./SecondStepEmail"

export interface IRegistrationsData {
    "id": number,
    "email": string,
    "quantity": number,
    "cityId": number,
    "classId": number,
    "sportGenderId": number,
    "createdAt": Date,
    "updatedAt": Date,
    "deletedAt": Date | null,
}

export interface IClassesData {
    "sport": string,
    "className": string,
    "candidates": ICandidateData[],
}

export interface ICandidateByCityData {
    "city": string,
    "classes": IClassesData[]
}