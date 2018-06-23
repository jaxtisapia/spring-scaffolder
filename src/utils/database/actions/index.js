const actions = require("../configuration").actions;
const {UPDATE_PACKAGE_NAME} = actions.packageName;
const {UPDATE_AUTHOR} = actions.author;
const {UPDATE_PARAM_STRUCTURE} = actions.paramStructure;

export const updatePackageName = payload => {
    return {
        type: UPDATE_PACKAGE_NAME,
        payload
    };
};

export const updateAuthor = payload => {
    return {
        type: UPDATE_AUTHOR,
        payload
    };
};

export const updateParamStructure = payload => {
    return {
        type: UPDATE_PARAM_STRUCTURE,
        payload
    };
};
