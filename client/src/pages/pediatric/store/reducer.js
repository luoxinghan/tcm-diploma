import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    courses: [],
    images: [],
    currentImage: 0,
    modalIsOpen: false
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_COURSES_ACTION:
            return state.set("courses", fromJS(action.courses));
        case actionTypes.CHANGE_IMAGES_ACTION:
            return state.set("images", action.images);
        case actionTypes.CHANGE_CURRENT_IMAGE_ACTION:
            return state.set("currentImage", action.index);
        case actionTypes.CHANGE_OPEN_STATE_ACTION:
            return state.set("modalIsOpen", action.modalIsOpen);
        default:
            return state;
    }
}