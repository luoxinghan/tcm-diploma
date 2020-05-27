import {actionTypes} from "./index";
import axios from "axios";
import {message} from "antd";

export const changeCurrent = (course) => ({
    type: actionTypes.CHANGE_CURRENT,
    course
});

export const changeImageUrl = (url) => ({
    type: actionTypes.CHANGE_IMAGE,
    url
});

function loadingPosts() {
    return { type: "LOADING_POSTS" }
}

export const fetchPosts = (courseId) => {
    return (dispatch) => {
        dispatch(loadingPosts());
        axios.post("/api/manage/containers/pediatric/course-id", {courseId})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCurrent(result.course));
                dispatch(changeImageUrl(typeof result.course.imgUrl === "undefined" ? null : result.course.imgUrl))
            })
    }
};

export const updateCourse = (data, props) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/pediatric/course-update", data)
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
                props.history.push("/manage/index/pediatric");
            })
    }
};