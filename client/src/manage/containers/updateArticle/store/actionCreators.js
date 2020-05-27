import {actionTypes} from "./index";
import axios from "axios";
import {message} from "antd";

export const changeCurrent = (article, menu) => ({
    type: actionTypes.CHANGE_CURRENT,
    article: article,
    menu: menu
});

export const changeImageUrl = (url) => ({
    type: actionTypes.CHANGE_IMAGE,
    url
});

function loadingPosts() {
    return { type: "LOADING_POSTS" }
}

export const fetchPosts = (articleId) => {
    return (dispatch) => {
        dispatch(loadingPosts());
        axios.post("/api/manage/containers/articles/id", {articleId})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCurrent(result.article, result.menu));
                dispatch(changeImageUrl(typeof result.article.articleImg === "undefined" ? null : result.article.articleImg))
            })
    }
};

export const updateArticle = (data, props) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/articles/update", data)
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
                props.history.push("/manage/index/learn/articles");
            })
    }
};

/*
export const example = (id) => {
    return (dispatch) => {
        dispatch(loadingPosts());
        axios.post("/api/article/get-article", id)
            .then((res)=>{
                const result = res.data.data;
                setTimeout(() => {
                    // Yay! Can invoke sync or async actions with `dispatch`
                    dispatch(changeCurrent(result.article, result.menu));
                }, 500);
            })
    }
};*/
