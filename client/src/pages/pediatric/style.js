import styled from 'styled-components';
import Hospital from "../../statics/picture/3.jpg";

export const PediatricWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const PediatricHeadImg = styled.div`
    width: 100%;
    height: 500px;
    background: url(${Hospital}) no-repeat center/100%;
`;

export const PediatricInfoArea = styled.div`
    width: 980px;
    min-width: 980px;
    padding: 10px 20px;
    margin: 10px auto;
    background: #fff;
`;

export const PediatricTitle = styled.h1`
    padding-top: 20px;
    font-size: 24px;
    color: #1f1f1f;
    font-weight: 700;
`;

export const InfoArea = styled.div`
    h2{
        padding-top: 10px;
        padding-bottom: 5px;
        color: #1f1f1f;
        font-size: 20px;
        font-weight: 700;
    }
    h3{
        padding-top: 10px;
        padding-bottom: 5px;
        color: #1f1f1f;
        font-size: 18px;
        font-weight: 600;
        text-indent: 2em;
    }
    p, ul{
        color: #333333;
        font-size: 16px;
        font-weight: 400;
    }
    p, .ti {
        text-indent: 2em;
    }
`;

export const PediatricCourseArea = styled.div`
    .ant-col{
        padding: 10px 15px;
    }
`;

export const CourseItem = styled.div`
    background: #f1f1f1;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    overflow: hidden;
`;

export const ItemImage = styled.div`
    width: 100%;
    height: 160px;
    background: url("${props => props.imgUrl}") no-repeat center/100%;
`;

export const ItemContent = styled.div`
    width: 100%;
    height: 100%;
    color: #fff;
    transition: all 1s ease;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    background: rgba(0,0,0,.48);
    margin: 0;
    h2{
        width: 100%;
        padding: 0 10px;
        color: #fff;
        font-size: 24px;
        line-height: 26px;
        font-weight: 700;
    }
    .lecturer{
        font-size: 18px;
        font-weight: 600;
    }
    .address{
        font-size: 12px;
        padding: 0;
        margin: 0;
    }
    .lecture-time{
        font-size: 12px;
        padding: 0;
        margin: 0;
    }
`;

export const PediatricGallery = styled.div`

`;