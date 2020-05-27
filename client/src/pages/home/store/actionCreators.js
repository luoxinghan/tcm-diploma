import axios from "axios";
import * as actionTypes from "./actionTypes";

export const changeMoments = (moments) => ({
    type: actionTypes.CHANGE_MOMENTS,
    moments: moments
});

export const changeCarousels = (carousels) => ({
    type: actionTypes.CHANGE_CAROUSELS,
    carousels
});

export const getAllMomentNews = () => {
    return (dispatch) => {
        axios.get("/api/home/moments").then((res)=>{
            const result = res.data.data;
            dispatch(changeMoments(result.moments))
        })
    }
};

export const getAllCarousels = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/carousels").then((res)=>{
            const result = res.data.data;
            dispatch(changeCarousels(result.carousels))
        })
    }
};

