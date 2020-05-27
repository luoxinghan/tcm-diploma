import React from 'react';
import { Icon  } from 'antd';
import { Route, Link, Redirect } from "react-router-dom";

// 渲染当前组件
export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props =>{
            let isAuthenticated  = localStorage.getItem('isAuthenticated');
/*            console.log("是否登录验证", isAuthenticated);
            console.log("Route.meta值得类型是否等于object", typeof (route.meta) === 'object', "route.meta等于多少",route.meta);
            console.log(!(typeof route.meta === 'object' && route.meta.isAuth) && !isAuthenticated);*/
            if ( !(typeof route.meta === 'object' && route.meta.isAuth) && !isAuthenticated ) {
                /*console.log("Meta", route);*/
                return <Redirect
                    to={{
                        pathname: "/manage/login",
                        state: { from: props.location }
                    }}
                />
            }
            /*if ( !(typeof route.meta === 'object' && route.meta.isAuth) && !isAuthenticated ) {
                return <Redirect
                    to={{
                        pathname: "/manage/login",
                        state: { from: props.location }
                    }}
                />
            }*/
            return (
                route &&( route.Redirect ? (<Redirect to={route.Redirect}/>) :  // +-
                    (<route.component {...props} routes={route.routes} />))
            )
        }}
    />
);

// 循环渲染当前路由数组中一维数组中的组件
export const RenderRoutes = ({routes}) => {return (routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />))};

// - children  返回当前路径， 会与当前route组件进行匹配， 如果匹配， 则返回当了路径match， 否则返回Null
/*
* 有时您需要渲染路径是否与位置匹配。在这些情况下，您可以使用儿童道具功能。它的工作方式与渲染完全相同，只是它会被调用，无论是否匹配。子渲染道具接收与组件和渲染方法相同的所有路径道具，除非路径无法匹配URL，否则匹配为空。这允许您根据路径是否匹配动态调整UI。如果路线匹配，我们在这里添加一个活动类
* */
export const OldSchoolMenuLink = ({ route }) => (
    <Route
        path={route.path}
        exact={route.exact}
        children={({ match }) => {
            return (
                <div className={match ? "active" : ""}>
                    <Link to={route.path} style={{ textDecoration: 'none', color: "#f6f6f6" }}><Icon type={route.icon}/>{route.name}</Link>
                </div>

            )
        }}
    />
);