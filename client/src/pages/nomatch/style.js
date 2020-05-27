import styled from 'styled-components';


export const NoMatchWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const NoMatchDiv = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    max-height: 720px;
    text-align: center;
`;

export const NoMatchContent = styled.div`
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
`;

export const NoFoundImage = styled.div`
    img{
      width: 500px;
    }
`;

export const NoFoundText = styled.div`
    position: relative;
    padding-top: 40px;
    h1{
      font-size: 20px;
      color: #1a1a1a;
      font-weight: 600;
    }
    p{
      font-size: 16px;
    }
`;