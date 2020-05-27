import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    content: []
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CONTENT:
            return state.set("content", action.content);
        default:
            return state;
    }
}