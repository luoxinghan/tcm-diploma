import {actionTypes} from "./index";
import axios from "axios";

export const changeCurrent = (article, menu) => ({
    type: actionTypes.CHANGE_CURRENT,
    article: article,
    menu: menu
});

export const getArticleById = (articleId) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/articles/id", {articleId})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCurrent(result.article, result.menu));
            })
    }
};