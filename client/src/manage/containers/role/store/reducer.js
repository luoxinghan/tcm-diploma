import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    roles: [],
    count: 0
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROLES:
            return state.merge({
                roles: action.roles,
                count: action.count
            });
        default:
            return state;
    }
}