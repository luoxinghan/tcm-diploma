import {actionTypes} from "./index";
import { message } from 'antd';
import axios from "axios";

export const momentsChange = (moments) => ({
    type: actionTypes.CHANGE_MOMENTS,
    moments
});

export const momentAdd = (moment) => ({
    type: actionTypes.ADD_MOMENTS,
    moment
});

export const momentUpdate = (moment) => ({
    type: actionTypes.UPDATE_MOMENTS,
    moment
});

export const momentDelete = (momentId) => ({
    type: actionTypes.DELETE_MOMENTS,
    momentId
});

export const getAllMoments = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/moments")
            .then((res)=>{
                const result = res.data.data;
                dispatch(momentsChange(result.moments))
            })
    }
};

export const addMoment = (moment) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/moments/add", moment)
            .then((res)=>{
                const result = res.data.data;
                dispatch(momentAdd(result.moment));
                message.info(result.message);
            })
    }
};

export const deleteMoment = (momentId) => {
    return (dispatch) => {
        dispatch(momentDelete(momentId));

        axios.post("/api/manage/containers/moments/delete", {momentId})
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};

export const updateMoment = (moment) => {
    return (dispatch) => {
        dispatch(momentUpdate(moment));

        axios.post("/api/manage/containers/moments/update", moment)
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};
