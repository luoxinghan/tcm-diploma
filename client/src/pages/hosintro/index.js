import React from 'react';
import {
    HospitalIntroWrapper,
    HospitalIntroImg,
    HospitalIntroInfo,
    Summary,
    SummaryTitle
} from './style';
import {Divider} from "antd";
import {FormattedMessage} from "react-intl";

function HospitalIntro() {
    return (
        <HospitalIntroWrapper>
            <HospitalIntroImg/>
            <HospitalIntroInfo>
                <Summary>
                    <SummaryTitle><FormattedMessage id="hospital.introduce.title" defaultMessage="Краткое описание больницы"/></SummaryTitle>
                    <Divider/>
                    <p><FormattedMessage id="hospital.introduce.content1" defaultMessage="Краткое описание больницы"/></p>
                    <p><FormattedMessage id="hospital.introduce.content2" defaultMessage="Краткое описание больницы"/></p>
                    <p><FormattedMessage id="hospital.introduce.content3" defaultMessage="Краткое описание больницы"/></p>
                    <p><FormattedMessage id="hospital.introduce.content4" defaultMessage="Краткое описание больницы"/></p>
                    <p><FormattedMessage id="hospital.introduce.content5" defaultMessage="Краткое описание больницы"/></p>
                </Summary>
            </HospitalIntroInfo>
        </HospitalIntroWrapper>
    );
}

export default HospitalIntro;