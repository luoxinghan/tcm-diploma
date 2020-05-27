import {actionTypes} from "./index";
import { message } from 'antd';
import axios from "axios";

export const changeContent = (content) => ({
    type: actionTypes.CHANGE_CONTENT,
    content: content
});

export const getContent = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/content")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeContent(result.content))
            })
    }
};

export const changeIsShow = (menuCode, isShow) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/content/show", {menuCode, isShow})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeContent(result.content));
                message.info(result.message);
            })
    }
};

export const deleteContent = (menuCode) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/content/delete", {menuCode})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeContent(result.content));
                message.info(result.message);
            })
    }
};

export const updateContent = (content) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/content/update", content)
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeContent(result.content));
                message.info(result.message);
            })
    }
};

export const addContent = (content) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/content/add", content)
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeContent(result.content));
                message.info(result.message);
            })
    }
};