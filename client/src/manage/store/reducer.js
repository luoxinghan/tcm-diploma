import { fromJS } from "immutable";
import {actionTypes} from "./index";
import { routerConfig as myRouterConfig } from '../../router/index'

const defaultState = fromJS({
    slidecollapsed: false,
    routerConfig: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_THE_SLIDE:
            return state.set("slidecollapsed",!state.get("slidecollapsed"));
        case actionTypes.GET_ROUTER_CONFIG:
            return state.set("routerConfig", myRouterConfig);
        case actionTypes.CHANGE_AUTHENTICATED:
            return state.set("isAuthenticated", action.isAuthenticated);
        default:
            return state;
    }
}