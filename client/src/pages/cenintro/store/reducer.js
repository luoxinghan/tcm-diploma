import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    doctors: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_DOCTORS:
            return state.set("doctors", action.doctors);
        default:
            return state;
    }
}