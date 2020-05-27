import { fromJS } from "immutable";
import {actionTypes} from "./index";

const defaultState = fromJS({
    isLogged: false,
    currentUser: {},
    loginData: "暂无数据"
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_ACTION:
            return state.set("loginData", action.loginData);
           /* return {...state, ...action};*/
        case actionTypes.CHANGE_LOGOUT:
            return state.merge({
                isLogged: action.isLogged,
                currentUser: action.currentUser
            });
        default:
            return state;
    }
}