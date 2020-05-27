import styled from "styled-components";

export const CarouselWrapper = styled.div`
    position: relative;
`;

export const CarouselImage = styled.div`
    height: 60px;
    img{
      height: 100%;
      transition: .3s;
    }
    img:hover{
      opacity: 0.7;
      cursor: pointer;
    }
`;

export const ImageDetail = styled.div`
    width: 100%;
    img{
      width: 100%;
    }
`;