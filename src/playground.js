const {convertToParamStructure} = require("./utils/converter");

const example = "Dog{String:name,long:id}.Cat{String:name,long :id,boolean:active}";

console.log(convertToParamStructure(example));