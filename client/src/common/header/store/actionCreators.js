import * as actionTypes from "./actionTypes";

export const hideTheNav = () => ({
    type: actionTypes.CHANGE_HIDE_ACTION
});

export const showTheNav = () => ({
    type: actionTypes.CHANGE_SHOW_ACTION
});

export const changeTop = (value) => ({
    type: actionTypes.CHANGE_THE_TOP_ACTION,
    value
});

export const changeTheSelectedKey = (key) => ({
    type: actionTypes.SELECTED_KEY_ACTION,
    key
});

