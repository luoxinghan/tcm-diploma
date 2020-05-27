import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    isHide: false,
    isTop: true,
    selectedKey: "/"
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_HIDE_ACTION:
            return state.set("isHide", true);
        case actionTypes.CHANGE_SHOW_ACTION:
            return state.set("isHide", false);
        case actionTypes.CHANGE_THE_TOP_ACTION:
            return state.set("isTop", action.value);
        case actionTypes.SELECTED_KEY_ACTION:
            return state.set("selectedKey", action.key);
        default:
            return state;
    }
}