import {actionTypes} from "./index";
import { message } from 'antd';
import axios from "axios";

export const changeArticles = (articles) => ({
    type: actionTypes.CHANGE_ARTICLES,
    articles: articles
});

export const getAllArticles = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/articles")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeArticles(result.articles));
            })
    }
};

export const getArticlesByCode = (menuCode) => {
    return (dispatch) => {
        axios.get("/api/manage/containers/articles?code=" + menuCode)
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeArticles(result.articles));
            })
    }
};

export const changeIsShow = (id, isShow) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/articles/show", {id, isShow})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeArticles(result.articles));
                message.info(result.message);
            })
    }
};

export const deleteArticle = (articleId) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/articles/delete", {articleId})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeArticles(result.articles));
                message.info(result.message);
            })
    }
};