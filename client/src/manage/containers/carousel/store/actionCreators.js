import {actionTypes} from "./index";
import { message } from 'antd';
import axios from "axios";

export const changeCarousels = (carousels) => ({
    type: actionTypes.CHANGE_CAROUSELS,
    carousels
});

export const carouselAdd = (carousel) => ({
    type: actionTypes.ADD_CAROUSELS,
    carousel
});

export const carouselUpdate = (carousel) => ({
    type: actionTypes.UPDATE_CAROUSELS,
    carousel
});

export const carouselDelete = (fileId) => ({
    type: actionTypes.DELETE_CAROUSELS,
    fileId
});

export const getAllCarousels = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/carousels")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCarousels(result.carousels))
            })
    }
};

export const addCarousel = (carousel) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/carousels/add", carousel)
            .then((res)=>{
                const result = res.data.data;
                dispatch(carouselAdd(result.carousel));
                message.info(result.message);
            })
    }
};

export const deleteCarousel = (fileId) => {
    return (dispatch) => {
        dispatch(carouselDelete(fileId));

        axios.post("/api/manage/containers/carousels/delete", {fileId})
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};

export const updateCarousel = (carousel) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/carousels/update", carousel)
            .then((res)=>{
                const result = res.data.data;
                dispatch(carouselUpdate(carousel));
                message.info(result.message);
            })
    }
};
