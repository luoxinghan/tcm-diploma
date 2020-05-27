import styled from 'styled-components';
import Hospital from "../../statics/picture/help.jpg";

export const HelpWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
`;

export const HospitalIntroImg = styled.img`
    width: 100%;
    height: 500px;
    background: url(${Hospital}) no-repeat center/100%;
`;

export const HelpInfo = styled.div`
    width: 980px;
    min-width: 980px;
    padding: 10px 20px;
    margin: 10px auto;
    .ant-collapse-header{
      font-weight: 600;
    }
    p{
      margin: 5px 0;
    }
    table{
      width: 100%;
      border-collapse: collapse;
      td, th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
      }
      th{
        background-color: #ddd;
      }
    }
    ul{
      li{
        list-style-type: none;
      }
    }
`;