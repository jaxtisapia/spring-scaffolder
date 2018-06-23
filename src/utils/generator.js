const Replacer =  require("string-template");

const {templates} =  require("./config");
const {repository, model, controller, service, response, responseObject, responseObjects} = templates;

export const generateModelClass = (packageName, author, className, fields) => {
    return Replacer(model, {package: packageName, Class: className, fields , author})
};

export const generateRepositoryClass = (packageName, author, className) => {
    return Replacer(repository, {package: packageName, class: className.toLowerCase(), Class: className , author})
};

export const generateControllerClass = (packageName, author, className) => {
    return Replacer(controller, {package: packageName, class: className.toLowerCase(), Class: className , author})
};

export const generateObjectResponseClass = (packageName, author, className) => {
    return Replacer(responseObject, {package: packageName, class: className.toLowerCase(), Class: className , author})
};

export const generateObjectsResponseClass = (packageName, author, className) => {
    return Replacer(responseObjects, {package: packageName, class: className.toLowerCase(), Class: className , author})
};

export const generateServiceClass = (packageName, author, className) => {
    return Replacer(service, {package: packageName, class: className.toLowerCase(), Class: className , author})
};

export const generateResponseCodeClass = (packageName) => {
    return Replacer(response, {package: packageName})
};

export const getClasses = (classObject) => {
    return (Object.keys(classObject));
};

export const getClassFields = (className, classObject) => {
    return classObject[className];
};

export const getFieldDeclarationsFromClass = (classFields) => {
    let fieldDeclaration = "";

    classFields.map((object) => {
        fieldDeclaration += `\nprivate ${object.field} ${object.name};\n`;
    });

    return fieldDeclaration;
};

export const decomposeClass = (classObject) => {

    //get all classes first
    const classes = (Object.keys(classObject));

    classes.forEach((classItem)=> {
        // get associated fields related to a class
        const classObjects =  classObject[classItem];
        let fieldDeclaration = "";

        classObjects.forEach((classObject) => {

            fieldDeclaration += `\nprivate ${classObject.field} ${classObject.name};\n`;

        });

       // console.log(generateModelClass('com.itcons.asda', classItem, fieldDeclaration));
       // console.log(generateControllerClass('com.itcons.asda', classItem, fieldDeclaration));
       // console.log(generateRepositoryClass('com.itcons.asda', classItem));
       // console.log(generateServiceClass('com.itcons.asda', classItem));
       // console.log(generateResponseCodeClass('com.itcons.asda', classItem));

    });
};

// decomposeClass(sampleClass);