import styled from "styled-components";

export const MomentWrapper = styled.div`
    width: 100%;
    position: relative;
    padding-top: 68px;
    min-width: 1020px;
    display: block;
    overflow: hidden;
    background-color: #f1f1f1;
`;

export const DetailInfo = styled.div`
    box-sizing: border-box;
    width: 750px;
    min-width: 750px;
    padding: 10px 20px;
    margin: 10px auto;
    border-radius: 5px;
    background-color: #ffffff;
    .moment-img{
        width: 100%;
        padding: 5px 0;
    }
    header{
        margin: 20px 0;
    }
    h1{
        font-weight: 600;
        font-synthesis: style;
        color: #1a1a1a;
        font-size: 26px;
        line-height: 1.22;
        margin: 15px 0;
        word-wrap: break-word;
    }
    .moment-content{
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
        line-height: 1.5;
        padding-bottom: 20px;
    }
`;

export const HeaderInfo = styled.div`
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    .menu-name{
        color: #555555;
        font-size: 18px;
    }
    .time{
        color: #999999;
        float: right;
    }
`;

export const TitleLine = styled.div`
    margin-top: 5px;
    width: 50px;
    height: 2px;
    background-color: #52c41a;
`;