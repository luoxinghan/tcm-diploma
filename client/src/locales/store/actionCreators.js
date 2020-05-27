import * as actionTypes from "./actionTypes";

export const setLanguage = (lang) => ({
    type: actionTypes.CHANGE_LOCALES_ACTION,
    lang: lang
});
