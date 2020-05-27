import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    carousels: []
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CAROUSELS:
            return state.set("carousels", action.carousels);
        case actionTypes.ADD_CAROUSELS:
            return state.set("carousels", state.get("carousels").concat(action.carousel));
        case actionTypes.DELETE_CAROUSELS:
            return state.set("carousels", state.get("carousels").filter((item) => {
                return item.fileId !== action.fileId;
            }));
        case actionTypes.UPDATE_CAROUSELS:
            return state.set("carousels", state.get("carousels").map((item) => {
                return item.fileId === action.carousel.fileId ? {...item, order: action.carousel.order} : item;
            }));
        default:
            return state;
    }
}