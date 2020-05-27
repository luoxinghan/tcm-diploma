import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux'
import {deleObj} from '../../utils'
import {actionCreators} from "../../store";
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : ( typeof v === 'object' ? (Array.isArray(v.routes) ? deepFlatten(v.routes.concat(deleObj(v, 'routes'))) : v) : v )));
let breadcrumbNameMap = [];

class Crumbs extends Component {
    componentDidMount () {  //页面渲染完毕后调用
        this.onTrun();
    }
    onTrun () {
        this.props.getRouterConfig(this.props.routerConfig);
    }
    render() {
        let { location, routerConfig } = this.props;
        routerConfig = routerConfig !== [] ? routerConfig.menus : routerConfig;
        breadcrumbNameMap = (Array.isArray(routerConfig) && deepFlatten(routerConfig)) || [];
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            let ItemName = Array.isArray(breadcrumbNameMap) && breadcrumbNameMap.map(item =>
                (item.path === url) ? item.name : ''
            );
            ItemName = ItemName.join('');
            return (
                ItemName &&((<Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {ItemName}
                    </Link>
                </Breadcrumb.Item>) || ''
            ));
        });
        return (
            <div className="my-breadcrumb"  style={{margin: "16px 16px"}}>
                <Breadcrumb>
                    {extraBreadcrumbItems}
                </Breadcrumb>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        routerConfig: state.get("manage").get("routerConfig")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRouterConfig(routerConfig){
            dispatch(actionCreators.getRouterConfig(routerConfig));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Crumbs));