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

export const DynamicAnnounceWrapper = styled.div`
    width: 100%;
    position: relative;
    z-index: 1000;
    box-sizing: border-box;
    margin-top: -50px;
`;

export const DynamicArea = styled.div`
    width: 1020px;
    min-width: 1020px;
    padding: 30px 20px;
    margin: 0 auto;
    background-color: rgba(240, 240, 240, .95);
    border-radius: 10px;
    h3{
      color: #1a1a1a;
      font-size: 25px;
      font-weight: 600;
      padding: 5px 0;
    }
    a{
      font-size: 16px;
      text-align: center;
    }
`;

export const DynamicList = styled.div`
    width: 980px;
    margin: 0 auto;
`;

export const MomentItem = styled.div`
    height: 100px;
    margin: 10px 0;
    transition: 0.5s;
    position: relative;
    &:hover{
        opacity: 0.7;
        cursor: pointer;
    }
`;

export const ItemNumber = styled.div`
    height: 80px;
    width: 90%;
    line-height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
    background: #fff;
    border-radius: 10px;
    p{
      width: 10%;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      color: #333;
    }
`;

export const ItemInfo = styled.div`
    height: 80px;
    width: 90%;
    position: absolute;
    top: 0;
    right: 0;
    border: 2px solid #fff;
    background: ${props=>props.background};
    border-radius: 10px;
    h2{
        margin-top: 10px;
        font-size: 18px;
        padding: 0 20px;
        color: #f1f1f1;
        font-weight: 600;
    }
    p{
        float: right;
        padding: 0 20px;
        color: #999999;
    }
`;

export const HomeVideoWrapper = styled.div`
    width: 1020px;
    margin: 20px auto;
    padding: 10px 20px;
`;

export const TuinaWrapper = styled.div` 
    width: 100%;
    padding: 20px 0;
    margin-top: 20px;
    box-sizing: border-box;
    background: #f1f1f1;
`;

export const TuinaArea = styled.div`
    width: 1020px;
    margin: 20px auto;
    padding: 0 20px;
    position: relative;
`;

export const TuinaIntro = styled.div`
    width: 70%;
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
      position: absolute;
      bottom: 0;
    }
`;

export const TuinaImg = styled.div`
    width: 30%;
    height: 200px;
    background-color: red;
    display: inline-block;
    position: relative;
    overflow: hidden;
`;

export const MapTitle = styled.div`
    width: 1020px;
    font-size: 16px;
    color: #95a5a6;
    letter-spacing: 2px;
    margin: 20px auto;
    padding: 10px 20px;
    text-align: center;
`;

export const HomeMapWrapper = styled.div`
    width: 1020px;
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

export const MedicalItem = styled.div`
    width: 100%;
    margin: 0 auto;
`;