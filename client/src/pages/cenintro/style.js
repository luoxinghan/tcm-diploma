import styled from 'styled-components';
import Center from "../../statics/picture/center.jpg";

export const CenterIntroWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const CenterIntroImg = styled.div`
    width: 100%;
    height: 500px;
    background: url(${Center}) no-repeat center/100%;
`;

export const CenterIntroInfo = styled.div`
    width: 980px;
    min-width: 980px;
    padding: 10px 20px;
    margin: 10px auto;
    background: #fff;
`;

export const Title = styled.h2`
    padding-top: 20px;
    font-size: 24px;
    color: #1f1f1f;
    font-weight: 700;
`;

export const CenterIntro = styled.div`
`;

export const IntroWordInfo = styled.div`
    color: #333333;
    font-size: 16px;
    line-height: 24px;
    margin: 10px 0;
    p{
      text-indent: 2em;
    }
`;

export const IntroImgInfo = styled.div`
    display: table-cell;
    height: 100%;
    width: 35%;
    vertical-align: middle;
    position: relative;
    img{
      width: 100%;
    }
`;

export const CenterDoctor = styled.div`
    margin-top: 20px;
`;

export const DoctorItem = styled.div`
    width: 100%;
    padding: 20px 0;
`;

export const DoctorImg = styled.div`
    display: table-cell;
    height: 100%;
    width: 20%;
    vertical-align: middle;
    position: relative;
    img{
      width: 100%;
      border-radius: 50%;
    }
`;

export const DoctorInfo = styled.div`
    height: 100%;
    width: 80%;
    display: table-cell;
    vertical-align: middle;
    padding: 0 25px 0 25px;
    position: relative;
    font-size: 15px;
    .name{
      font-size: 16px;
      color: #444444;
      font-weight: 600;
    }
    .job-title{
      font-size: 12px;
      color: #646464;
      margin: 3px 0;
      padding: 0;
    }
    .introduction{
      font-size: 15px;
      color: #1a1a1a;
      margin-top: 5px;
    }
`;