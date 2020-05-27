import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {
    CenterIntroWrapper,
    CenterIntroImg,
    CenterIntroInfo,
    Title,
    CenterIntro,
    IntroWordInfo,
    CenterDoctor,
    DoctorItem,
    DoctorImg,
    DoctorInfo
} from './style';
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {Divider} from "antd";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";

class HospitalIntro extends Component {
    componentDidMount() {
        this.props.getAllDoctors();
    }

    render() {
        const { doctors } = this.props;
        return (
            <CenterIntroWrapper>
                <CenterIntroImg/>
                <CenterIntroInfo>
                    <CenterIntro>
                        <Title><FormattedMessage id="center.introduce.title" defaultMessage="Краткое описание центра традиционной китайской медицины"/></Title>
                        <Divider/>
                        <IntroWordInfo>
                            <FormattedHTMLMessage id="center.introduce.content"/>
                        </IntroWordInfo>
                    </CenterIntro>
                    <CenterDoctor>
                        <Title><FormattedMessage id="center.doctors.title" defaultMessage="Наши врачи"/></Title>
                        <Divider/>
                        {doctors.map((item)=>{
                            return (
                                <DoctorItem key={item.employeeId}>
                                    <DoctorImg>
                                        <img alt="Doctor's avator" src={item.avatarUrl}/>
                                    </DoctorImg>
                                    <DoctorInfo>
                                        {console.log(item.employeeDescription)}
                                        <h3 className="name">{item.name}</h3>
                                        <p className="job-title">{item.roleName}</p>
                                        <div className="introduction" dangerouslySetInnerHTML={{__html: item.employeeDescription}}/>
                                    </DoctorInfo>
                                </DoctorItem>
                            )
                        })}
                    </CenterDoctor>
                </CenterIntroInfo>
            </CenterIntroWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctors: state.get("cenintro").get("doctors")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors(){
            dispatch(actionCreators.getAllDoctors());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HospitalIntro));