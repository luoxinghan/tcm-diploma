import React, {Component} from "react";
import ContactImage from "../../statics/picture/contact.png";
import {
    ContactUsWrapper,
    ContactUsInfo,
    ContactUsImg,
    ContactMainArea,
    SendMessageArea
} from "./style";
import {Form, Input, Button, Modal} from "antd";
import {FormattedMessage} from "react-intl";

class ContactUs extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Modal.success({
                    content: <FormattedMessage id="contact.submit.message.content" defaultMessage="Спасибо за ваши отзывы, мы ответим вам по электронной почте как можно скорее!"/>,
                });
                this.props.form.resetFields();
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <ContactUsWrapper>
                <ContactUsInfo>
                    <ContactUsImg/>
                    <ContactMainArea>
                        <ul>
                            <li className="message">
                                <SendMessageArea>
                                    <h1><FormattedMessage id="contact.submit.title" defaultMessage="Оставьте нам сообщение"/></h1>
                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                        <Form.Item>
                                            {getFieldDecorator('fullName', {
                                                rules: [{required: true, message: <FormattedMessage id="contact.submit.name.warning" defaultMessage="Пожалуйста, введите свое полное имя и фамилия!"/>}],
                                            })(
                                            <Input
                                                placeholder="Имя и фамилия"
                                            />)}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('email', {
                                                rules: [{required: true, message: <FormattedMessage id="contact.submit.email.warning" defaultMessage="Пожалуйста, введите свой адрес электронной почты!"/>}],
                                            })(
                                                <Input
                                                    placeholder="Электронная почта"
                                                />)}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('message', {
                                                rules: [{required: true, message: <FormattedMessage id="contact.submit.content.warning" defaultMessage="Пожалуйста, введите сообщение!"/>}],
                                            })(
                                                <Input
                                                    placeholder="Содержание"
                                                />)}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                <FormattedMessage id="contact.submit.submit" defaultMessage="Отправить"/>
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </SendMessageArea>
                            </li>
                            <li className="img">
                                <img alt={ContactImage} src={ContactImage}/>
                            </li>
                        </ul>
                    </ContactMainArea>
                </ContactUsInfo>
            </ContactUsWrapper>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'contact-us' })(ContactUs);
export default WrappedNormalLoginForm;