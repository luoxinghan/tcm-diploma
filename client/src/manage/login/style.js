import styled from "styled-components";
import pureLogo from "../../statics/logo/with_not_text.png";
import loginBackground from "../../statics/picture/login.png";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormLogo = styled.div`
    height: 46px;
    width: 46px;
    position: absolute;
    left: 20px;
    top: 15px;
    background: url(${pureLogo}) no-repeat center/100%;
`;

export const FormBack = styled.div`
    position: absolute;
    left: 20px;
    bottom: 15px;
    font-size: 12px;
    a{
      color: #ffffff;
    }
`;

export const FormCopyright = styled.div`
    position: absolute;
    bottom: 15px;
    right: 20px;
    font-size: 12px;
    color: #3d9f83;
`;

export const LoginArea = styled.div`
    width: 920px;
    height: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    background: url(${loginBackground}) no-repeat center/100%;
    box-shadow: 3px 3px 8px rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FormWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  Button{
    width: 100%;
    background-color: #3d9f83;
    border: none;
  }
  h2{
    text-align: center;
    font-size: 20px;
    color: #777;
  }
  .login-form-forgot{
    border: none;
    background: none;
    width: auto;
    color: #1890FF;
    cursor: pointer;
  }
`;