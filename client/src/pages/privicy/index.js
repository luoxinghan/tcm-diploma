import React from 'react';
import {
    PrivacyPolicyWrapper,
    PrivacyPolicyInfo,
    PrivacyPolicyImage,
    PrivacyVersionInfo
} from './style';
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";

function HospitalIntro() {
    return (
        <PrivacyPolicyWrapper>
            <PrivacyPolicyImage/>
            <PrivacyPolicyInfo>
                <PrivacyVersionInfo>
                    <p><strong><FormattedMessage id="privacy.version.time" defaultMessage="版本生效日期：2019-11-09"/></strong></p>
                    <p>
                        <FormattedHTMLMessage
                            id="privacy.version.head"
                            defaultMessage="<p>Grodno TCM Center （以及下文提到的“我们”、“我们的”或“本app”）是由主体公司甘肃省中医院格罗德诺中医中心提供的网络产品。
                            <br/>产品名称：Grodno TCM Center<br/>产品类别：网站</p><p>网址：www.grodnotcmc.com</p>
                            <p>如果您决定使用我们产品提供的服务，本协议用于告知我们对于用户的隐私如何收集、使用和披露。</p>
                            <p><strong>如果您选择使用我们提供的服务，则表示您同意收集和使用与此政策相关的信息。我们收集的个人信息用于提供和改进服务。除非本隐私政策中另有说明，否则我们不会与任何人一起使用或分享您的信息。</strong></p>
                            <p>除非本隐私政策另有规定，否则本隐私政策中使用的术语与我们的条款和条件具有相同的含义，可在Grodno TCM Center中访问。</p>"
                        />
                    </p>
                    <FormattedHTMLMessage id="privacy.version.content1"/>
                    <FormattedHTMLMessage id="privacy.version.content2"/>
                    <FormattedHTMLMessage id="privacy.version.content3"/>
                    <FormattedHTMLMessage id="privacy.version.content4"/>
                    <FormattedHTMLMessage id="privacy.version.content5"/>
                    <FormattedHTMLMessage id="privacy.version.content6"/>
                    <FormattedHTMLMessage id="privacy.version.content7"/>
                    <FormattedHTMLMessage id="privacy.version.content8"/>
                    <FormattedHTMLMessage id="privacy.version.content9"/>
                    <FormattedHTMLMessage id="privacy.version.content10"/>
                    <FormattedHTMLMessage id="privacy.version.content11"/>
                </PrivacyVersionInfo>
            </PrivacyPolicyInfo>
        </PrivacyPolicyWrapper>
    );
}

export default HospitalIntro;