const paramStructureActions = require("../configuration").actions.paramStructure;
const { UPDATE_PARAM_STRUCTURE } = paramStructureActions;

const defaultParamStructure = require("../store/default").paramStructure;

export default (state = defaultParamStructure, action) => {

    switch (action.type) {
        case UPDATE_PARAM_STRUCTURE:
            if (!action.payload) return state;
            else return action.payload;

        default:
            return state;
    }
};
