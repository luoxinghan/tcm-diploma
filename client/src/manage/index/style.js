import styled from "styled-components";
export const HomeWrapper = styled.div`
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }
    
    .trigger:hover {
        color: #1890ff;
    }
    
    
    .logo {
        height: 32px;
        background: rgba(255,255,255,.2);
        margin: 16px;
    }
    
    .ant-menu li a{
        display: block;
        width: 100%;
        height: 100%;
    }
    
    .ant-menu.ant-menu-dark .ant-menu-item-selected a, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected a{
        color: #fff;
    }
    
    li.ant-menu-item>div, .ant-menu-submenu-title>div{
        overflow: hidden;
    }
    
    .ant-avatar-lg{
      margin: 11px;
      float: right;
    }
`;

export const LinkDelete = styled.a`
    color: #ff4757;
    cursor: pointer;
    &:hover{
      opacity: .7;
    }
`;

export const LinkUpdate = styled.a`
    color: #1e90ff;
    cursor: pointer;
    &:hover{
      opacity: .7;
    }
`;

export const LinkHidden = styled.a`
    color: #a4b0be;
    cursor: pointer;
    &:hover{
      opacity: .7;
    }
`;

export const LinkShow = styled.a`
    color: #eccc68;
    cursor: pointer;
    &:hover{
      opacity: .7;
    }
`;
