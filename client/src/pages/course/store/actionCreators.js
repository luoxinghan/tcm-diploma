import {actionTypes} from "./index";
import axios from "axios";

export const changeCourse = (course) => ({
    type: actionTypes.CHANGE_COURSE,
    course
});

export const getCourseById = (courseId) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/pediatric/course-id", {courseId})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCourse(result.course));
            })
    }
};