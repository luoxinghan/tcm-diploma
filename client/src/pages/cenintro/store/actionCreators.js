import axios from "axios";
import * as actionTypes from "./actionTypes";

export const changeDoctors = (doctors) => ({
    type: actionTypes.CHANGE_DOCTORS,
    doctors
});

export const getAllDoctors = () => {
    return (dispatch) => {
        axios.get("/api/center-intro/doctors").then((res)=>{
            const result = res.data.data;
            dispatch(changeDoctors(result.doctors))
        })
    }
};


