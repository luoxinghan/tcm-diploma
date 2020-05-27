import * as actionTypes from "./actionTypes";

export const changeSlideAction = () => ({
    type: actionTypes.CHANGE_THE_SLIDE
});

export const getRouterConfig = (routerConfig) => ({
    type: actionTypes.GET_ROUTER_CONFIG,
    routerConfig: routerConfig
});

export const changeIsAuthenticated = (isAuthenticated) => ({
    type: actionTypes.CHANGE_AUTHENTICATED,
    isAuthenticated
});


