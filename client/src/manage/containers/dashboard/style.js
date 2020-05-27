import styled from"styled-components";

export const DashboardWrapper = styled.div`
    position: relative;
    overflow: hidden;
`;

export const ImageWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 4% 2%;
    box-sizing: border-box;
    height: 100vh;
`;

export const ImageItem = styled.div`
    flex: 1;
    overflow: hidden;
    transition: .5s;
    margin: 0 2%;
    box-shadow: 0 20px 30px rgba(0,0,0,0.1);
    line-height: 0;
    
    &:hover {
        flex: 1 1 50%;
    }
    
    &:hover > img {
        width: 140%;
        height: 100%;
    }
`;

export const Image = styled.img`
    margin-left: -90px;
    width: 200%;
    height: calc(100%);
    object-fit: cover;
`;