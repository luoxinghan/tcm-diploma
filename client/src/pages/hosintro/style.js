import styled from 'styled-components';
import Hospital from "../../statics/picture/hospital-img.jpg";

export const HospitalIntroWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const HospitalIntroImg = styled.img`
    width: 100%;
    height: 500px;
    background: url(${Hospital}) no-repeat center/100%;
`;

export const HospitalIntroInfo = styled.div`
    width: 980px;
    min-width: 980px;
    padding: 10px 20px;
    margin: 10px auto;
    background: #fff;
`;

export const Summary = styled.div`
    p{
        color: #333333;
        font-size: 16px;
        line-height: 24px;
        text-indent: 2em;
        margin: 10px 0;
    }
`;

export const SummaryTitle = styled.div`
    padding-top: 20px;
    font-size: 24px;
    color: #1f1f1f;
    font-weight: 700;
`;