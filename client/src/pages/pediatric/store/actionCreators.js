import * as actionTypes from "./actionTypes";
import axios from "axios";

export const changeCourses = (courses) => ({
    type: actionTypes.CHANGE_COURSES_ACTION,
    courses
});

export const changeImages = (images) => ({
    type: actionTypes.CHANGE_IMAGES_ACTION,
    images
});

export const changeOpenState = (modalIsOpen) => ({
    type: actionTypes.CHANGE_OPEN_STATE_ACTION,
    modalIsOpen
});

export const changeCurrentIndex = (index) => ({
    type: actionTypes.CHANGE_CURRENT_IMAGE_ACTION,
    index
});

export const getPediatricCourses = () => {
    return (dispatch) => {
        axios.get("/api/pediatric/courses")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCourses(result.courses))
            })
    }
};

export const getPediatricImages = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/pediatric/images")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeImages(result.images))
            })
    }
};