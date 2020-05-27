import styled from "styled-components";

export const HomeWrapper = styled.div`
    position: relative;
    z-index: 100;
    min-width: 1020px;
    display: block;
    overflow: hidden;
    padding-bottom: 10px;
    box-sizing: border-box;
`;

export const HomeCarouselWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    
    .ant-carousel .slick-slide {
      text-align: center;
      height: 650px;
      overflow: hidden;
      line-height: 650px;
      background: #364d79;
      }
    
    .ant-carousel .slick-slide h3 {
      color: #fff;
    }
`;

export const CarouselItem = styled.div`
    height: 100%;
    background: url(${props=>props.imgUrl}) no-repeat center/100%;
    h3{
      opacity: 0;
    }
`;

export const HomeContent = styled.div`
    width: 100%;
    background: #fff;
`;

export const MedicalWayContent = styled.div`
    padding: 10px 0;
`;

export const MedicalWayList = styled.div`
    width: 95%;
    padding: 30px 20px;
    margin: 10px auto;
`;

export const MedicalItem = styled.div`
    text-align: center;
    line-height: 1.2;
    color: #1f1f1f;
`;

export const MedicalIcon = styled.div`
    .iconfont{
      font-size: 48px;
      font-weight: 400;
    }
`;

export const MedicalTitle = styled.h3`
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
`;

export const DynamicAnnounceWrapper = styled.div`
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .anticon{
        font-size: 38px;
        color: #333;
        cursor: pointer;
        opacity: 0.7;
    }
`;

export const DynamicArea = styled.div`
    width: 1120px;
    min-width: 1120px;
    padding: 0 20px;
    margin: 0 auto;
    text-align: right;
    a{
        color: #1a1a1a;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const MomentItem = styled.div`
    width: 100%;
    height: 220px;
    padding: 10px 8px;
    text-align: center;
    overflow: hidden;
`;

export const MomentImage = styled.div`
    float: right;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1s ease;
    background: url(${props=>props.imgUrl}) no-repeat center/100%;
`;

export const MomentContent = styled.div`
    float: right;
    width: calc(100% - 16px);
    height: calc(100% - 20px);
    transition: all 1s ease;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: rgba(0,0,0,.48);
    margin: 0;
    position: absolute;
    h2{
        width: 100%;
        padding: 0 10px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        line-height: 26px;
        font-weight: 700;
    }
    p{
        padding: 0 5px;
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        color: #fff;
        font-size: 14px;
        line-height: 16px;
        font-weight: 400;
    }
    .home-button{
        background-color: #1890ff;
        border-radius: 0;
        border: 1px solid #1890ff;
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        padding: 6px 14px;
        transition: all .25s ease;
        cursor: pointer;
        &:hover{
            background: #fff;
            color: #1890ff;
        }
    }
`;

export const HomeVideoWrapper = styled.div`
    width: 1120px;
    margin: 10px auto;
    padding: 10px 28px;
`;

export const TuinaWrapper = styled.div` 
    width: 100%;
    padding: 20px 0;
    margin-top: 20px;
    box-sizing: border-box;
    background: #f9f9f7;
`;

export const TuinaArea = styled.div`
    width: 1120px;
    margin: 20px auto;
    padding: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    .pediatric-img{
        width: 35%;
    }
`;

export const TuinaIntro = styled.div`
    width: 65%;
    float: left;
    padding-right: 20px;
    h3{
      font-weight: 600;
      font-size: 25px;
      color: #1a1a1a;
    }
    p{
      font-size: 14px;
      color: #7f8c8d;
    }
    .button{
      display: block;
    }
`;

export const TuinaImg = styled.div`
    width: 30%;
    float: left;
    height: 200px;
    background-color: red;
`;

export const HomeMapWrapper = styled.div`
    width: 1120px;
    margin: 20px auto;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    border-radius: 10px;
`;

export const MapContainer = styled.div`
    width: 60%;
    height: 320px;
    display: inline-block;
    position: relative;
    overflow: hidden;
`;

export const MapContactInfo = styled.div`
    width: 40%;
    float: right;
    padding-left: 20px;
    color: #1a1a1a;
    font-weight: 600;
    box-sizing: border-box;
    h3{
      font-size: 25px;
      font-weight: 600;
    }
    .ant-row-flex{
      padding: 5px 0;
    }
    .iconfont{
      font-size: 30px;
      color: #C39B67;
    }
    .title{
      font-size: 16px;   
    }
    .detail{
      font-weight: normal;
      font-size: 14px;
      color: #555;
    }
`;