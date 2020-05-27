import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    course: null,
    imageUrl: null
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT:
            return state.set("course", action.course);
        case actionTypes.CHANGE_IMAGE:
            return state.set("imageUrl", action.url);
        default:
            return state;
    }
}