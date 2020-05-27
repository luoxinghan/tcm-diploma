import { message } from 'antd';
import axios from "axios";

export const addPediatricCourse = (data, props) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/pediatric/course-add", data)
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
                props.history.push("/manage/index/pediatric");
            })
    }
};