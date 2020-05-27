import React, { Component } from 'react';
import { RenderRoutes } from '../../../router/utils'
import {Layout} from "antd";
const { Content } = Layout;
class MyMain extends Component {
    render() {
        let { routes } = this.props;
        return (
            <Content style={{ margin: '0px 16px', padding: 24, background: '#fff', minHeight: 360 }}>
                <RenderRoutes routes={routes}/>
            </Content>
        )
    }
}
export default MyMain;