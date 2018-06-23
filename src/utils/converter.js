/**
 * @param input String value to be removed of all white spaces including tabs, spaces and new lines
 * */
const removeAllSpaces = (input) => {
    return input.replace(/ /g,'');
};

/**
 * @param input String value of customised structure.
 * Example of Customised Structure -> Dog{String:name,long:id}.Cat{String:name,long :id,boolean:active}
 * Splits structure into separate classes with '.' delimiter
 * @return Array. Example ['Dog{String:name,long:id}','Cat{String:name,long :id,boolean:active}']
 * */
const splitClasses = (input) => {
    return input.split('.')
};

/**
 * @param input String value to extract internal objects. Example. Dog{String:name,long:id}
 * @return String with only the potential-object-fields. Ex. {String:name,long:id}
 * */
const getFields = (input) => {
    return input.split('{').pop().split('}').shift();
};

/**
 * @param input String value to extract main class name. Example. Dog{String:name,long:id}
 * @return String with only the potential-object-key. Ex. Dog
 * */
const getClassName = (input) => {
    return input.split('{')[0]
};

/**
 * @param input String value to extract field into required objects. Example. {String:name,long:id}
 * @return Array of Objects. Ex. [{ field: 'String', name: 'name'}, {field: 'long', name: 'id'} }]
 * */
const convertFieldToObjects = (input) => {
    const array = [];
    const objectInputs =  input.split(',');

    objectInputs.map((objectInput) => {
        const field = objectInput.split(':');
        array.push({ field:field[0], name:field[1] })
    });

    return array;
};

const convertToParamStructure = (input) => {

    const finalObject = {};

    // first remove all white spaces
    input = removeAllSpaces(input);

    // split inputs into separate classes
    const splitInputs = splitClasses(input);

    splitInputs.map((splitInput) => {

        const className = getClassName(splitInput);
        const fields = getFields(splitInput);
        finalObject[className] = convertFieldToObjects(fields);
    });

    return finalObject;
};

module.exports = {
    convertToParamStructure
};