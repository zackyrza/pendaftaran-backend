export interface IFirstStepRegistrationsData {
  "name": string,
  "total": number,
}

export interface IFirstStepClassData {
  "name": string,
  "registrations": IFirstStepRegistrationsData[],
}

export interface IFirstStepData {
  "sport": string,
  "city": string,
  "class": IFirstStepClassData[],
}