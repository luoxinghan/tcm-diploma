import styled from "styled-components";

export const FooterWrapper = styled.div`
    position: relative;
    z-index: 10;
    min-width: 1020px;
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #1f1f1f;
`;

export const FooterMenu = styled.div`
    width: 1120px;
    height: 260px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

export const FooterLang = styled.div`
    width: 1120px;
    height: 40px;
    padding: 0 20px;
    margin: 0 auto;
    align-items: center;
    p{
      float: right;
      line-height: 40px;
      font-size: 12px;
      color: #95a5a6;
    }
`;

export const LanguageChange = styled.div`
    color: #ecf0f1;
    line-height: 40px;
    float: left;
    .iconfont{
        font-size: 14px;
        font-weight: 500;
    }
`;

export const FooterLogo = styled.div`
    width: calc(100% / 10 * 4);
    float: left;
    img{
      width: 80%;
    }
`;

export const FooterContact = styled.div`
    width: calc(100% / 10 * 3);
    float: left;
    h3{
      color: #bdc3c7;
      line-height: 1.5;
      font-weight: 700;
      font-size: 14px;
    }
`;

export const FlUs = styled.div`
    .iconfont{
      color: #ecf0f1;
      font-size: 1.7em;
      margin-right: 15px;
      transition: .5s;
    }
    .iconfont:hover{
      color: #C39B67;
    }
`;

export const CtUs = styled.div`
    padding-top: 30px;
    p{
      color: #ecf0f1;
      line-height: 1;
      transition: .5s;
    }
    p:hover {
      color: #C39B67;
    }
`;

export const FooterRight = styled.div`
    width: calc(100% / 10 * 3);
    float: left;
    .link-content{
      color: #ecf0f1;
      font-weight: bold;
      transition: .5s;
    }
    .link-content:hover{
      color: #C39B67;
    }
`;