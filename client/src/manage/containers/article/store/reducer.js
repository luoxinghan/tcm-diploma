import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    articles: [],
    currentCode: null
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_ARTICLES:
            return state.set("articles", action.articles);
        default:
            return state;
    }
}