import {actionTypes} from "./index";
import { message } from 'antd';
import axios from "axios";
import { actionCreators as roleAC } from "../../role/store";

export const changeStaffs = (staffs) => ({
    type: actionTypes.CHANGE_STAFFS,
    staffs
});

export const staffAdd = (staff) => ({
    type: actionTypes.ADD_STAFF,
    staff
});

export const staffUpdate = (staff) => ({
    type: actionTypes.UPDATE_STAFF,
    staff
});

export const staffDelete = (employeeId) => ({
    type: actionTypes.DELETE_STAFF,
    employeeId
});

export const getAllStaffs = () => {
    return (dispatch) => {
        dispatch(roleAC.getAllRoles());

        axios.get("/api/manage/containers/staffs")
            .then((res)=>{
                const result = res.data.data;
                dispatch(changeStaffs(result.staffs))
            })
    }
};

export const addStaff = (staff) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/staffs/add", staff)
            .then((res)=>{
                const result = res.data.data;
                dispatch(staffAdd(result.staff));
                message.info(result.message);
            })
    }
};

export const deleteStaff = (employeeId) => {
    return (dispatch) => {
        dispatch(staffDelete(employeeId));

        axios.post("/api/manage/containers/staffs/delete", {employeeId})
            .then((res)=>{
                const result = res.data.data;
                message.info(result.message);
            })
    }
};

export const updateStaff = (staff) => {
    return (dispatch) => {
        axios.post("/api/manage/containers/staffs/update", staff)
            .then((res)=>{
                const result = res.data.data;
                dispatch(staffUpdate(staff));
                message.info(result.message);
            })
    }
};
