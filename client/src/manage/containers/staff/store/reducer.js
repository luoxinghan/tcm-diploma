import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    staffs: []
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_STAFFS:
            return state.set("staffs", action.staffs);
        case actionTypes.ADD_STAFF:
            return state.set("staffs", state.get("staffs").concat(action.staff));
        case actionTypes.DELETE_STAFF:
            return state.set("staffs", state.get("staffs").filter((item) => {
                return item.employeeId !== action.employeeId;
            }));
        case actionTypes.UPDATE_STAFF:
            return state.set("staffs", state.get("staffs").map((item) => {
                return item.employeeId === action.staff.employeeId ?
                    item = action.staff : item;
            }));
        default:
            return state;
    }
}