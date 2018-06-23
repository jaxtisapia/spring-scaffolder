const authorActions = require("../configuration").actions.author;
const { UPDATE_AUTHOR } = authorActions;

const defaultAuthor = require("../store/default").author;

export default (state = defaultAuthor, action) => {

    switch (action.type) {
        case UPDATE_AUTHOR:
            if (!action.payload) return state;
            else return action.payload;

        default:
            return state;
    }
};
