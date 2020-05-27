import styled from "styled-components";

export const ContactUsWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const ContactUsInfo = styled.div`
    box-sizing: border-box;
    width: 980px;
    min-width: 980px;
    padding: 10px 20px;
    margin: 10px auto;
    background: #fff;
`;

export const ContactUsImg = styled.div`
    width: 100%;
    height: 68px;
`;

export const ContactMainArea = styled.div`
    box-sizing: border-box;
    h1{
        padding: 20px 0;
        font-size: 40px;
        font-weight: 500;
    }
    ul{
        flex-wrap: wrap;
        display: flex;
        align-items: center;
        li{
            list-style-type:none;
        }
        .message{
            width: 45%;
            .ant-input{
                width: 70%;
                height: 35px;
            }
        }
        .img{
            width: 55%;
            padding-left: 40px;
            img{
                width: 90%;
            }
        }
    }
`;

export const SendMessageArea = styled.div`
`;