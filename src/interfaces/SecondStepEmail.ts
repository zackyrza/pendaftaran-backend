export interface ICandidateData {
    name: string,
    registrationId: number,
    status: string,
    nik: string,
    photo: string,
    ktp: string;
    ijazah: string;
    gender: string,
    placeOfBirth: string,
    birthDate: Date,
    age: number,
    education: string,
    bloodType: string,
    rhesusType: string,
    weight: number,
    height: number,
    handphone: string,
    religion: string,
    occupation: string,
    maritalStatus: string,
    email: string,
}

export interface ISecondStepData {
    "sport": string,
    "city": string,
    "className": string,
    "candidates": ICandidateData[],
}

export interface ISecondStepEmailData {
    "sport": string,
    "city": string,
    "className": string,
    "candidate": ICandidateData,
}