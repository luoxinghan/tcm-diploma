import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {actionCreators, actionTypes} from "./store";
import {actionCreators as manageAC} from "../store";
import {
    Form, Icon, Input, Button, Checkbox, notification
} from 'antd';
import {
    LoginWrapper,
    FormLogo,
    FormBack,
    FormCopyright,
    LoginArea,
    FormWrapper
} from "./style";

class Login extends Component{
    state = {
        remember: true,
    };

    changeRemember = () => {
        this.setState({
            remember: !this.state.remember
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    };
    openNotification = () => {
        notification.open({
            message: '请联系管理员',
            description:
                '后台密码属于唯一信息，如果忘记密码，请联系管理员处理，邮箱：xinghanluo@gmail.com',
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let { loginData }  = this.props;

        const { from } = this.props.location.state || { from: { pathname: "/manage" } };
        if (typeof loginData === 'object') {
            if (loginData.code === 200) {
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('currentUser', JSON.stringify(loginData.currentUser));
            }
        }

        let isAuthenticated  = localStorage.getItem('isAuthenticated');
        // 判断是否登录，
        if (isAuthenticated === "true") {
            from.pathname = from.pathname === '/manage/login' ? '/manage' :  from.pathname;
            this.props.changeAuth(true);
            return <Redirect to={from} />;
        } else {
            return (
                <LoginWrapper>
                    <LoginArea>
                        <FormLogo/>
                        <FormBack><Link to="/">首页</Link></FormBack>
                        <FormCopyright>©Copyright 甘肃省中医院</FormCopyright>
                        <FormWrapper>
                            <h2>登录</h2>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: '请输入用户名!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="用户名"/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="密码"/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.remember,
                                    })(
                                        <Checkbox onChange={this.changeRemember}>记住我</Checkbox>
                                    )}
                                    <span className="login-form-forgot" onClick={this.openNotification}>忘记密码</span><br/>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </FormWrapper>
                    </LoginArea>
                </LoginWrapper>
            );
        }
    }
}



const mapStateToProps = (state) => {
    return {
        loginData: state.get("login").get("loginData"),
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login(values){
            //console.log(values);
            dispatch(actionCreators.fetchPosts('/api/manage/login', actionTypes.LOGIN_ACTION, 'loginData', values));
        },
        changeAuth(isAuthenticated){
            dispatch(manageAC.changeIsAuthenticated(isAuthenticated))
        }
    }
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);