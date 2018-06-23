import { combineReducers } from "redux";

import packageName from "./packageName";
import author from "./author";
import paramStructure from "./paramStructure";

const rootReducer = combineReducers({
    packageName,
    author,
    paramStructure
});

export default rootReducer;
