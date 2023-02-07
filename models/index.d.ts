import Sequelize = require("sequelize");
const { Model } = Sequelize;

export let sequelize: any;
declare let City: Model;
declare let Candidate: Model;
declare let Class: Model;
declare let Registration: Model;
declare let Sport: Model;
declare let SportGender: Model;
declare let User: Model;
export { Sequelize, City, Candidate, Class, Registration, Sport, SportGender, User };
