import { message } from 'antd';
import axios from "axios";

export const addArticle = (data, props) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/articles/add", data)
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
                props.history.push("/manage/index/learn/articles");
            })
    }
};