import styled from "styled-components";

export const ArticleWrapper = styled.div`
  position: relative;
`;
export const ArticleHelpInfo = styled.div`
  font-size: 16px;
  padding: 5px 0;
  color: #555555;
  strong{
    color: #ff4757;
  }
`;

export const SiderMenu = styled.div`
  position: relative;
  display: table-cell;
  width: 10%;
  .ant-menu-inline{
      border-radius: 10px;
      border: 1px solid #e8e8e8;
  }
  .add-button{
      margin-bottom: 5px;
  }
`;

export const TableList = styled.div`
  position: relative;
  display: table-cell;
  width: 70%;
`;

export const ArticleTitle = styled.span`
  color: #ffa502;
  transition: .5s;
  &:hover{
      color: #70a1ff;
  }
`;