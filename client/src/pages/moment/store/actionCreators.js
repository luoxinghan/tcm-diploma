import axios from "axios";
import {actionTypes} from "../store";

export const changeCurrent = (moment) => ({
    type: actionTypes.CHANGE_CURRENT,
    moment: moment,
});

export const getMomentById = (momentId) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/moments/id", {momentId})
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeCurrent(result.moment));
            })
    }
};