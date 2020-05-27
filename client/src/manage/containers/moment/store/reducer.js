import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    moments: []
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOMENTS:
            return state.set("moments", action.moments);
        case actionTypes.DELETE_MOMENTS:
            return state.set("moments", state.get("moments").filter((item) => {
                return item.momentId !== action.momentId;
            }));
        case actionTypes.UPDATE_MOMENTS:
            return state.set("moments", state.get("moments").map((item) => {
                return item.momentId === action.moment.momentId ?
                    item = action.moment : item;
            }));
        case actionTypes.ADD_MOMENTS:
            return state.set("moments", state.get("moments").concat(action.moment));

        /*case actionTypes.UPDATE_CAROUSELS:
            return state.set("carousels", state.get("carousels").map((item) => {
                return item.fileId === action.carousel.fileId ? {...item, order: action.carousel.order} : item;
            }));*/
        default:
            return state;
    }
}