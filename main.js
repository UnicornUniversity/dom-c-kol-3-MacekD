//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */

import { get } from "node:http";

//Const 
const gender = ["male", "female"]
const maleNames = [
  "Jan", "Petr", "Jakub", "Tomáš", "Martin",
  "Adam", "Matěj", "Vojtěch", "David", "Filip",
  "Daniel", "Ondřej", "Štěpán", "Lukáš", "Antonín",
  "Václav", "Josef", "Michal", "Marek", "Samuel",
  "Jiří", "František", "Karel", "Richard", "Vít"
];
const femaleNames = [
  "Eliška", "Viktorie", "Anna", "Sofie", "Natálie",
  "Tereza", "Ema", "Adéla", "Julie", "Laura",
  "Nela", "Karolína", "Rozálie", "Barbora", "Anežka",
  "Veronika", "Marie", "Kristýna", "Stella", "Emma",
  "Sára", "Amálie", "Mia", "Klára", "Štěpánka"
];
const maleSurnames = [
  "Novák", "Svoboda", "Novotný", "Dvořák", "Černý",
  "Procházka", "Kučera", "Veselý", "Horák", "Němec",
  "Pokorný", "Hruška", "Král", "Růžička", "Fiala",
  "Beneš", "Sýkora", "Krejčí", "Kolář", "Jelínek",
  "Čech", "Sedláček", "Vacek", "Bartoš", "Šimek"
];
const femaleSurnames = [
  "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá",
  "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová",
  "Pokorná", "Hrušková", "Králová", "Růžičková", "Fialová",
  "Benešová", "Sýkorová", "Krejčíová", "Kolářová", "Jelínková",
  "Čechová", "Sedláčková", "Vacková", "Bartošová", "Šimková"
];
const workloads = [10, 20, 30, 40]
//Main

var _youngestPossibleEmployeeBirthday;
var _oldestPosibleEmployeeBirthday;
export function main(dtoIn) {
  if (typeof dtoIn.count !== "number" || !dtoIn.count || dtoIn.count <= 0) throw new Error("Count must be a positive number");
  if (!dtoIn.age || typeof dtoIn.age.min !== "number" || typeof dtoIn.age.max !== "number") throw new Error("Age min/max must be numbers");
  if (dtoIn.age.min > dtoIn.age.max) throw new Error("Age min cannot be greater than max");

  DefineEdgeBirthdayDates(dtoIn.age.min, dtoIn.age.max);
  let employees = [];
  for(let i = 0; i< dtoIn.count; i++){
    var employee =  new Employee();
    employees.push(employee);
  }
  let dtoOut = employees;
  return dtoOut;
}

//Object constructor
function Employee(){
  this.gender = GetGender();
  this.birthdate = GetBirthdate();
  this.name = GetName(this.gender);
  this.surname = GetSurname(this.gender);
  this.workload = GetWorkload();
}

//Helper function
function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetGender(){
  return gender[GetRandomInt(0,1)]
}

function GetBirthdate() {
  const min = _oldestPosibleEmployeeBirthday;
  const max = _youngestPossibleEmployeeBirthday;
  const randomTimestamp = GetRandomInt(min, max);
  return new Date(randomTimestamp).toISOString();
}

function SubtractYearsFromTimestamp(timestamp, years) {
    const d = new Date(timestamp);
    d.setFullYear(d.getFullYear() - years);
    return d.getTime();
}

function DefineEdgeBirthdayDates(minAge, maxAge){
  const now = Date.now();

  //Nejmladší se narodil teď přesně v tento moment před [minAge]
  _youngestPossibleEmployeeBirthday = SubtractYearsFromTimestamp(now, minAge);

  //Nejstajší se narodil za 1ms narodil přesně před [maxAge]
  _oldestPosibleEmployeeBirthday = SubtractYearsFromTimestamp(now, maxAge);
}

function GetName(gender){
  return gender === "male" 
    ? maleNames[GetRandomInt(0, maleNames.length-1)] 
    : femaleNames[GetRandomInt(0, femaleNames.length-1)]
}

function GetSurname(gender){
  return gender === "male" 
    ? maleSurnames[GetRandomInt(0, maleSurnames.length-1)] 
    : femaleSurnames[GetRandomInt(0, femaleSurnames.length-1)]
}

function GetWorkload(){
  return workloads[GetRandomInt(0, workloads.length-1)];
}