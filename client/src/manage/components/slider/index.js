import React, { Component } from 'react';
import { Menu, Layout } from 'antd'; // +
import {connect} from "react-redux";
import {actionCreators} from "../../store";
import {filterData} from "../../utils";
import slideMenu from "../slideMenu"; // +
import { menus as menusConfig } from '../../../router/index';
const { Sider } = Layout; // +
class MySlider extends Component {
    render() {
        let { slidecollapsed, getRouterConfig } = this.props;
        slidecollapsed =  filterData(slidecollapsed, 'slidecollapsed');// +
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={ slidecollapsed } // +-
            >
                <div className="logo" />
                <div onClick={() => getRouterConfig}>
                    <Menu theme="dark" mode="inline" inlineCollapsed={slidecollapsed} defaultSelectedKeys={['/manage/index/UI']}>
                        {slideMenu(menusConfig)}
                    </Menu>
                </div>
            </Sider>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        slidecollapsed: state.get("manage").get("slidecollapsed"),
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

export default connect(mapStateToProps, mapDispatchToProps)(MySlider); // +-