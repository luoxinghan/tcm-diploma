import styled from 'styled-components';
import last_logo from "../../statics/logo/logo.png";

export const HeaderWrapper = styled.header`
    z-index: 1000;
    min-width: 1020px;
    width: 100%;
    top: -1rem;
    transform: translate3d(0,0,0);
`;

export const NavMenu = styled.div`
    width: auto;
    position: relative;
    padding: 0 20px;
    margin: 0 auto;
    font-weight: 600;
    transition: top .25s ease-in-out,background .25s ease-in-out;
    /*${function (props) {
        if (props.isTop === true) {
            return "top: 0;background-color: rgba(255, 255, 255,1);"
        } else {
            if (props.isHide === false) {
                return "top: 0;background-color: rgba(255, 255, 255,1);box-shadow: 0 0 1px 1px rgba(34,45,57,.15);"
            } else {
                return "top: 0;background-color: rgba(255, 255, 255,1);box-shadow: 0 0 1px 1px rgba(34,45,57,.15);";
            }
        }
    }}*/
`;

export const HeaderMenu = styled.div`
    width: 100%;
    height: 72px;
    text-align: center;
    position: relative;
    top: 0;
    transition: top .25s ease-in-out;
`;

export const HeaderNav = styled.ul`
    display: block;
    padding: 0;
    margin: 0;
    list-style: none;
    float: right;
    .ant-menu{
        background: none;
        position: relative;
        .ant-menu-horizontal .ant-menu-item-active{
          color:red;
        }
    }
    .ant-menu-item .ant-menu-item-selected, 
    .ant-menu-horizontal .ant-menu-item-active,
    .ant-menu-horizontal{
        border-bottom: none;
    }
`;

export const MenuItem = styled.li`
    line-height: 72px;
    position: relative;
    float: left;
    display: inline-block;
    &.active{
        color: #9abdb1;
    }
    a{
        font-size: 15px;
        font-weight: 600;
        color: rgba(241, 242, 246,1.0);
    }
`;

export const NavLogo = styled.a.attrs({
   href: '/'
})`
    height: 72px;
    width: 280px;
    float: left;
    z-index: 999;
    position: relative;
    background: url(${last_logo}) no-repeat center/100%;
`;