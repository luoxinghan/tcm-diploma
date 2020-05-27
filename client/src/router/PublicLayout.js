import React from "react";
import {Route, Switch} from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";

import Home from "../pages/home";
import Moment from "../pages/moment";
import HospitalIntro from "../pages/hosintro";
import CenterIntro from "../pages/cenintro";
import LearnTcm from "../pages/learntcm";
import Pediatric from "../pages/pediatric";
import ContactUs from "../pages/contact";
import PrivacyPolicy from "../pages/privicy";
import ArticleDetail from "../pages/article";
import PediatricCourseDetail from "../pages/course";
import Help from "../pages/help";
import NoMatch from "../pages/nomatch";

import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import moment from "moment";
import {ConfigProvider} from "antd";

moment.locale('cn');

function PublicLayout(props) {
    return (
        <ConfigProvider locale={zhCN}>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/hospital_intro" exact component={HospitalIntro}/>
                <Route path="/center_intro" exact component={CenterIntro}/>
                <Route path="/learn_tcm" exact component={LearnTcm}/>
                <Route path="/pediatric" exact component={Pediatric}/>
                <Route path="/contact" exact component={ContactUs}/>
                <Route path="/privacy" exact component={PrivacyPolicy}/>
                <Route path="/article/detail/:id" exact component={ArticleDetail}/>
                <Route path="/pediatric/courses/detail/:id" exact component={PediatricCourseDetail}/>
                <Route path="/moment/detail/:id" exact component={Moment}/>
                <Route path="/help" exact component={Help}/>
                <Route component={NoMatch}/>
            </Switch>
            <Footer/>
        </ConfigProvider>
    );
}

export default PublicLayout;