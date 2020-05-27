import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    course: null
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_COURSE:
            return state.set("course", action.course);
        default:
            return state;
    }
}