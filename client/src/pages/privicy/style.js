import styled from "styled-components";
import Privacy from "../../statics/picture/privacy.png";

export const PrivacyPolicyWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const PrivacyPolicyImage = styled.div`
    width: 100%;
    height: 600px;
    background: url(${Privacy}) no-repeat center/100%;
`;

export const PrivacyPolicyInfo = styled.div`
    width: 980px;
    min-width: 980px;
    padding: 10px 20px;
    margin: 10px auto;
    background: #fff;
`;

export const PrivacyVersionInfo = styled.div`
    p{
      color: #333333;
      font-size: 14px;
    }
    h3{
      padding: 15px 0;
      font-size: 20px;
      font-weight: 700;
    }
    h4{
      padding: 10px 0;
      font-size: 16px;
      font-weight: 700;
    }
`;