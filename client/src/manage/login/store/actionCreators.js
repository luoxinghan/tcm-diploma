import {actionTypes} from "./index";
import axios from "axios";
import {Icon, notification} from "antd";
import React from "react";

export const changeLogout = () => ({
    type: actionTypes.CHANGE_LOGOUT,
    isLogged: false,
    currentUser: {}
});

export const handleLogin = (values) =>{
    fetchPosts('/api/manage/login', actionTypes.LOGIN_ACTION, 'loginData', values);
};

export const fetchPosts = (url, actionType, subreddit, data) => {
    /*console.log("fetchPosts", url, actionType, subreddit, data);*/
    return (dispatch) => {
        return axios.post(url, data).then((res)=>{
            if (res.data.data.code === 400) {
                notification.open({
                    message: '登录失败',
                    description:
                        '请检查用户名或密码是否正确。',
                    icon: <Icon type="frown" style={{ color: '#e74c3c' }} />
                });
            }
            dispatch(receive(actionType, subreddit, res.data.data));
        }).catch((err)=>{
            console.log(err.response);
        })
    }
};

export const receive = ( typeName, dataName, data) => {
    return {
        type: typeName,
        [dataName]: data
    }
};