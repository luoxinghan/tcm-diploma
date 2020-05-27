import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    courses: [],
    images: []
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_COURSES:
            return state.set("courses", action.courses);
        case actionTypes.CHANGE_IMAGES:
            return state.set("images", action.images);
        case actionTypes.CHANGE_COURSES_SHOW:
            return state.set("courses", state.get("courses").map((item) => {
                return item.courseId === action.course.courseId ?
                    item = action.course : item;
            }));
        case actionTypes.DELETE_COURSES:
            return state.set("courses", state.get("courses").filter((item) => {
                return item.courseId !== action.courseId;
            }));
        case actionTypes.DELETE_IMAGES:
            return state.set("images", state.get("images").filter((item) => {
                return item.fileId !== action.fileId;
            }));
        case actionTypes.ADD_IMAGES:
            return state.set("images", action.images);
        /*case actionTypes.UPDATE_MOMENTS:
            return state.set("moments", state.get("moments").map((item) => {
                return item.momentId === action.moment.momentId ?
                    item = action.moment : item;
            }));
        /*case actionTypes.UPDATE_CAROUSELS:
            return state.set("carousels", state.get("carousels").map((item) => {
                return item.fileId === action.carousel.fileId ? {...item, order: action.carousel.order} : item;
            }));*/
        default:
            return state;
    }
}