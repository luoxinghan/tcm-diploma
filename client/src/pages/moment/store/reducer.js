import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    moment: null
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT:
            return state.set("moment", action.moment);
        default:
            return state;
    }
}