import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    menus: [],
    articles: [],
    currentMenu: null
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_MENUS_ACTION:
            return state.set("menus", action.menus);
        case actionTypes.GET_ARTICLES_ACTION:
            return state.set("articles", action.articles);
        case actionTypes.CHANGE_CURRENT_MENU:
            return state.set("currentMenu", action.currentMenu);
        default:
            return state;
    }
}