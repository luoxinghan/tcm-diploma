import * as actionTypes from "./actionTypes";
import axios from "axios";

export const changeMenus = (menus) => ({
    type: actionTypes.GET_MENUS_ACTION,
    menus
});

export const changeArticles = (articles) => ({
    type: actionTypes.GET_ARTICLES_ACTION,
    articles
});

export const changeCurrentMenu = (currentMenu) => ({
    type: actionTypes.CHANGE_CURRENT_MENU,
    currentMenu
});

export const getAllMenus = () => {
    return (dispatch) => {
        axios.get("/api/learntcm/menus")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeMenus(result.menus))
            })
    }
};

export const getAllArticles = () => {
    return (dispatch) => {
        axios.get("/api/learntcm/menus/articles")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeArticles(result.article))
            })
    }
};

export const getMenuArticles = (code) => {
    return (dispatch) => {
        axios.get("/api/learntcm/menus/articles?code=" + code)
            .then((res)=>{
                const result = res.data.data;
                /*console.log("menu articles res", res.data.data);*/
                dispatch(changeArticles(result.article))
            })
    }
};

export const getCurrentMenu = (menuCode) => {
    return (dispatch) => {
        axios.post("/api/learntcm/current", {menuCode})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCurrentMenu(result.menu));
            })
    }
};