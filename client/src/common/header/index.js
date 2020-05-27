import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import {
    HeaderWrapper, NavLogo, NavMenu,HeaderMenu,HeaderNav
} from './style';
import {actionCreators} from "./store";
import {actionCreators as localesActionCreators} from "../../locales/store";
import {FormattedMessage} from "react-intl";

let lastScrollY = 0;
let thisScrollY = 0;

class Header extends Component {
    render() {
        /*const {isHide, isTop, handleChangeKey} = this.props;*/
        const {handleChangeKey} = this.props;
        const path = this.props.location.pathname;
        return (
            <HeaderWrapper>
                <NavMenu>
                    <NavLogo/>
                    <HeaderMenu>
                        <HeaderNav>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={[path]}
                                style={{ lineHeight: '70px'}}
                            >
                                <Menu.Item onClick={handleChangeKey} key="/"><Link to="/"><FormattedMessage id="components.header.home" defaultMessage="首页"/></Link></Menu.Item>
                                <Menu.Item onClick={handleChangeKey} key="/hospital_intro"><Link to="/hospital_intro"><FormattedMessage id="components.header.hospital" defaultMessage="医院简介"/></Link></Menu.Item>
                                <Menu.Item onClick={handleChangeKey} key="/center_intro"><Link to="/center_intro"><FormattedMessage id="components.header.center" defaultMessage="中心简介"/></Link></Menu.Item>
                                <Menu.Item onClick={handleChangeKey} key="/learn_tcm"><Link to="/learn_tcm"><FormattedMessage id="components.header.learn" defaultMessage="了解中医"/></Link></Menu.Item>
                                <Menu.Item onClick={handleChangeKey} key="/pediatric"><Link to="/pediatric"><FormattedMessage id="components.header.pediatric" defaultMessage="小儿推拿"/></Link></Menu.Item>
                            </Menu>
                        </HeaderNav>
                    </HeaderMenu>
                </NavMenu>
            </HeaderWrapper>
        );
    }

    /*componentDidMount() {
        const {handleScroll} = this.props;
        window.addEventListener('scroll', handleScroll);
    };

    componentWillUnmount() {
        const {handleScroll} = this.props;
        window.removeEventListener('scroll', handleScroll);
    };*/
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
        handleScroll() {
            thisScrollY = window.scrollY;
            if (thisScrollY === 0) {
                dispatch(actionCreators.changeTop(true));
            } else {
                if (lastScrollY - thisScrollY > 0) {
                    dispatch(actionCreators.showTheNav())
                } else if(lastScrollY - thisScrollY < 0) {
                    dispatch(actionCreators.hideTheNav())
                }
                dispatch(actionCreators.changeTop(false));
            }
            lastScrollY = thisScrollY;
        },
        handleChangeKey(event){
            let sKey = event.key;
            dispatch(actionCreators.changeTheSelectedKey(sKey))
        },
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));