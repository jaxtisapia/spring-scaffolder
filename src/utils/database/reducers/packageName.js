const packageNameActions = require("../configuration").actions.packageName;
const { UPDATE_PACKAGE_NAME } = packageNameActions;

const defaultPackageName = require("../store/default").packageName;

export default (state = defaultPackageName, action) => {

    switch (action.type) {

        case UPDATE_PACKAGE_NAME:
            if (!action.payload) return state;
            else return action.payload;

        default:
            return state;
    }
};
