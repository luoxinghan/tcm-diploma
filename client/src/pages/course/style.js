import styled from "styled-components";

export const CourseDetailWrapper = styled.div`
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
    width: 950px;
    min-width: 950px;
    padding: 10px 20px;
    margin: 10px auto;
    border-radius: 5px;
    background-color: #ffffff;
`;

export const DetailLeft = styled.div`
    width: 40%;
    display: table-cell;
    padding-right: 20px;
    position: relative;
    vertical-align: top;
    text-align: right;
    font-size: 14px;
    overflow: hidden;
    p{
        margin: 0;
        padding: 0;
    }
    .lecturer {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
    }
    .time-title{
        font-size: 14px;
        font-weight: 600;
        color: #555555;
    }
    .time{
        color: #999999;
        font-size: 12px;
    }
`;

export const DetailRight = styled.div`
    width: 60%;
    display: table-cell;
    position: relative;
    vertical-align: top;
    .title-img{
        width: 100%;
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
`;

export const HeaderInfo = styled.div`
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    .time-title{
        font-weight: 600;
        color: #555555;
    }
    .time{
        color: #999999;
        float: right;
        margin-right: 15px;
    }
`;

export const TitleLine = styled.div`
    margin-top: 5px;
    width: 50px;
    height: 2px;
    background-color: #52c41a;
`;