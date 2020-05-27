import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    article: null,
    menu: null,
    imageUrl: null
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT:
            return state.merge({
                article: action.article,
                menu: action.menu
            });
        case actionTypes.CHANGE_IMAGE:
            return state.set("imageUrl", action.url);
        default:
            return state;
    }
}