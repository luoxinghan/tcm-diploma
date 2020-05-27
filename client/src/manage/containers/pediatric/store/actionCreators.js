import {actionTypes} from "./index";
import { message } from 'antd';
import axios from "axios";

export const coursesChange = (courses) => ({
    type: actionTypes.CHANGE_COURSES,
    courses
});

export const courseShowChange = (course) => ({
    type: actionTypes.CHANGE_COURSES_SHOW,
    course
});

export const courseDelete = (courseId) => ({
    type: actionTypes.DELETE_COURSES,
    courseId
});

export const imagesChange = (images) => ({
    type: actionTypes.CHANGE_IMAGES,
    images
});

export const imagesAdd = (images) => ({
    type: actionTypes.ADD_IMAGES,
    images
});

export const imageDelete = (fileId) => ({
    type: actionTypes.DELETE_IMAGES,
    fileId
});

export const getAllCourses = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/pediatric/courses")
            .then((res)=>{
                const result = res.data.data;
                dispatch(coursesChange(result.courses))
            })
    }
};

export const getAllImages = () => {
    return (dispatch) => {
        axios.get("/api/manage/containers/pediatric/images")
            .then((res)=>{
                const result = res.data.data;
                dispatch(imagesChange(result.images));
            })
    }
};

export const changeCourseIsShow = (course) => {
    return (dispatch) => {
        dispatch(courseShowChange(course));

        axios.post("/api/manage/containers/pediatric/course-update", course)
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};

export const deleteCourse = (courseId) => {
    return (dispatch) => {
        dispatch(courseDelete(courseId));

        axios.post("/api/manage/containers/pediatric/courses-delete", {courseId})
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};

export const addImages = (files) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/pediatric/images-add", {files})
            .then((res)=>{
                const result = res.data.data;
                dispatch(imagesAdd(result.images));
                message.info(result.message);
            })
    }
};

export const deleteImage = (fileId) => {
    return (dispatch) => {
        dispatch(imageDelete(fileId));

        axios.post("/api/manage/containers/pediatric/images-delete", {fileId})
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};
