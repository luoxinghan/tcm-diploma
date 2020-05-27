import React from 'react';
import {
    HelpWrapper,
    HospitalIntroImg,
    HelpInfo
} from './style';

import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import { Collapse} from "antd";

const { Panel } = Collapse;

function Help() {
    return (
        <HelpWrapper>
            <HospitalIntroImg/>
            <HelpInfo>
                <Collapse
                    defaultActiveKey={['1','6']}
                    expandIconPosition="right"
                >
                    <Panel header={<FormattedMessage id="help.question1.title" defaultMessage="1. Порядок прохождения лечения"/>} key="1" className="site-collapse-custom-panel">
                        <FormattedHTMLMessage id="help.question1.content"/>
                    </Panel>
                    <Panel header={<FormattedMessage id="help.question2.title" defaultMessage="2. На что следует обратить внимание перед началом сеанса иглоукалывания?"/>} key="2" className="site-collapse-custom-panel">
                        <FormattedHTMLMessage id="help.question2.content"/>
                    </Panel>
                    <Panel header={<FormattedMessage id="help.question3.title" defaultMessage="3. Иглоукалывание – это больно?"/>} key="3" className="site-collapse-custom-panel">
                        <FormattedHTMLMessage id="help.question3.content"/>
                    </Panel>
                    <Panel header={<FormattedMessage id="help.question4.title" defaultMessage="4、Нормально ли иметь головокружение, тошноту, кровотечение, образование гематомы или слабость конечностей во время иглоукалывания?"/>} key="4" className="site-collapse-custom-panel">
                        <FormattedHTMLMessage id="help.question4.content"/>
                    </Panel>
                    <Panel header={<FormattedMessage id="help.question5.title" defaultMessage="5. На что следует обратить внимание после сеанса иглоукалывания?"/>} key="5" className="site-collapse-custom-panel">
                        <FormattedHTMLMessage id="help.question5.content"/>
                    </Panel>
                    <Panel header={<FormattedMessage id="help.price.title" defaultMessage="1. Порядок прохождения лечения"/>} key="6" className="site-collapse-custom-panel">
                        <FormattedHTMLMessage id="help.price.table"/>
                    </Panel>
                </Collapse>
            </HelpInfo>
        </HelpWrapper>
    );
}

export default Help;