import React, {Component} from 'react';
import {ManageHomeLogo, ManageHomeWrapper} from './style';


import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageHome extends Component {
    state = {
        theme: "dark",
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <ManageHomeWrapper>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <ManageHomeLogo/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
                            <Menu.Item key="1">
                                <Icon type="desktop"/>
                                <span>控制台</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="file-image" />
                                <span>首页轮播图</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                      <Icon type="idcard" />
                                      <span>User</span>
                                    </span>
                                }>
                                <Menu.Item key="3">Tom</Menu.Item>
                                <Menu.Item key="4">Bill</Menu.Item>
                                <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                      <Icon type="team"/>
                                      <span>Team</span>
                                    </span>
                                }>
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <Icon type="file"/>
                                <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>Bill is a cat.</div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </ManageHomeWrapper>
        );
    }
}

export default ManageHome;