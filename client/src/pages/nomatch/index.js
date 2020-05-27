import React from 'react';
import {
    NoMatchDiv,
    NoMatchWrapper,
    NoMatchContent,
    NoFoundImage,
    NoFoundText
} from './style';
import {Link} from "react-router-dom";
import NoFound from "../../statics/picture/404_page_not_found.png";
import {FormattedMessage} from "react-intl";

function HospitalIntro() {
    return (
        <NoMatchWrapper>
            <NoMatchDiv>
                <NoMatchContent>
                    <NoFoundImage>
                        <img src={NoFound} alt="No Found"/>
                    </NoFoundImage>
                    <NoFoundText>
                        <h1><FormattedMessage id="nomatch.title" defaultMessage="Страница не существует"/></h1>
                        <p><FormattedMessage id="nomatch.prompt" defaultMessage="Извините! Запрашиваемая Вами страница не существует. Проверьте правильность адреса или "/><Link to="/"><FormattedMessage id="nomatch.back.button" defaultMessage="вернитесь на главную страницу"/></Link><FormattedMessage id="nomatch.back.dot" defaultMessage="."/></p>
                    </NoFoundText>
                </NoMatchContent>
            </NoMatchDiv>
        </NoMatchWrapper>
    );
}

export default HospitalIntro;