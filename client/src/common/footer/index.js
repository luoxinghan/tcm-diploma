import React, {Component} from 'react';
import logo from "../../statics/logo/logo.png";
import {Link, withRouter} from "react-router-dom";
import {
    FooterWrapper,
    FooterMenu,
    FooterLogo,
    FooterContact,
    FooterRight,
    FlUs,
    CtUs,
    LanguageChange,
    FooterLang
} from './style';
import {FormattedMessage} from "react-intl";
import {Dropdown, Menu} from "antd";
import {actionCreators as localesActionCreators} from "../../locales/store";
import {connect} from "react-redux";

class Footer extends Component {
    render() {
        const {usersLocale, changeToChinese, changeToRussian, changeToEnglish} = this.props;
        const menu = (
            <Menu>
                <Menu.Item onClick={changeToChinese}>
                    中文
                </Menu.Item>
                <Menu.Item onClick={changeToRussian}>
                    Русский
                </Menu.Item>
                <Menu.Item onClick={changeToEnglish}>
                    English
                </Menu.Item>
            </Menu>
        );
        return (
            <FooterWrapper>
                <FooterMenu>
                    <FooterLogo>
                        <img src={logo} alt={logo}/>
                    </FooterLogo>
                    <FooterContact>
                        <FlUs>
                            <h3><FormattedMessage id="components.footer.follow" defaultMessage="Следите за нами"/>
                            </h3>
                            <a className="link" href="https://vk.com/grodno_chinesemedicinecenter"><span
                                className="iconfont">&#xf25e;</span></a>
                            <a className="link" href="https://www.instagram.com/chinese_medicine_center/"><span
                                className="iconfont">&#xe68c;</span></a>
                        </FlUs>
                        <CtUs>
                            <h3><FormattedMessage id="components.footer.contact" defaultMessage="Контактная информация"/>
                            </h3>
                            <a href="https://yandex.by/maps/10274/grodno/?from=api-maps&ll=23.828642%2C53.694199&mode=routes&origin=jsapi_2_1_75&rtext=~53.694199%2C23.828642&rtt=auto&ruri=~&z=17"><p>г.Гродно ул. Даватара 23/1</p></a>
                            <a href="tel:+375152442011"><p>+375 (152) 44-20-11</p></a>
                        </CtUs>
                    </FooterContact>
                    <FooterRight>
                        <a className="link-content" href="http://www.gszyy.com/">
                            <p><FormattedMessage id="components.footer.about" defaultMessage="О нас"/></p>
                        </a>
                        <Link className="link-content" to="/help">
                            <p><FormattedMessage id="components.footer.help" defaultMessage="Справка"/></p>
                        </Link>
                        <Link className="link-content" to="/manage">
                            <p><FormattedMessage id="components.footer.account" defaultMessage="Аккаунт"/></p>
                        </Link>
                        <Link className="link-content" to="/contact">
                            <p><FormattedMessage id="components.footer.feedback" defaultMessage="Обратная связь"/></p>
                        </Link>
                        <Link className="link-content" to="/privacy">
                            <p><FormattedMessage id="components.footer.privacy" defaultMessage="Политика приватности"/></p>
                        </Link>
                    </FooterRight>
                </FooterMenu>
                <FooterLang>
                    <LanguageChange>
                        <Dropdown overlay={menu} placement="topLeft">
                                <span className="iconfont">&#xe614; {
                                    usersLocale === "cn" ? "中文" : (usersLocale === "en" ? "English" : "Русский")
                                }</span>
                        </Dropdown>
                    </LanguageChange>
                    <p>© <FormattedMessage id="components.footer.copyright" defaultMessage="Больница традиционной китайской медицины провинции Ганьсу"/>. All Rights Reserved.</p>
                </FooterLang>
            </FooterWrapper>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isHide: state.get("header").get("isHide"),
        isTop: state.get("header").get("isTop"),
        selectedKey: state.get("header").get("selectedKey"),
        usersLocale: state.get("locales").get("usersLocale")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeToChinese(){
            dispatch(localesActionCreators.setLanguage('cn'));
        },
        changeToRussian(){
            dispatch(localesActionCreators.setLanguage('ru'));
        },
        changeToEnglish(){
            dispatch(localesActionCreators.setLanguage('en'));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));