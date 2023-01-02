import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { ReactComponent as FooterLogo } from "../../icons/LogoGlyphXSm.svg";
import BREAKPOINT from "../../breakpoint";

const FooterComponent = styled.footer`
  width: 100vw;
  height: max-content;
  background-color: hsl(210, 8%, 15%);
  color: hsl(210, 8%, 60%);
  padding-top: 10px;
  padding-bottom: 0px;
  .footerContainer {
    margin: 0;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
      flex-direction: column;
      li {
        display: inline;
      }
    }
    padding: 32px 12px 12px;
    width: 100vw;
    height: 100%;
    .footLogo {
      flex: 0 0 64px;
      margin: -12px 0 32px;
      @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
        display: none;
      }
    }
    .menuContainer {
      display: flex;
      flex: 2 1 auto;
      > ul {
        flex: 1 0 auto;
        padding: 0 12px 24px 0;
        > h5 {
          margin: 0 0 4px;
          > a {
            text-decoration: none;
            color: hsl(210, 8%, 75%);
          }
          color: hsl(210, 8%, 75%);
        }
        > li {
          line-height: 2;
          font-size: 13px;
          list-style: none;
        }
      }
      @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
        flex-direction: column;
        li {
          display: inline;
        }
      }
    }
    .snsCopyright {
      display: flex;
      flex-direction: column;
      flex: 1 1 150px;
      font-size: 11px;
      @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
        flex: 1 1 60px;
      }
      .snsContainer {
        > ul {
          padding: 0;
          display: flex;
          > li {
            list-style: none;
            margin-left: 12px;
            padding: 4px 0;
            &:first-child {
              margin: 0;
            }
          }
        }
      }
      .copyrightContainer {
        margin: auto 0 24px;
        list-style: none;
      }
    }
  }
`;

const Footer = () => {
  return (
    <>
      <FooterComponent>
        <ul className="footerContainer">
          <div className="footLogo">
            <Link to="/">
              <FooterLogo />
            </Link>
          </div>
          <li className="menuContainer">
            <ul>
              <h5>
                <a href="/">STACK OVERFLOW</a>
              </h5>
              <li>Questions&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Help</li>
            </ul>
            <ul>
              <h5>PRODUCTS</h5>
              <li>Teams&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Advertising&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Collectives&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Talent</li>
            </ul>
            <ul>
              <h5>COMPANY</h5>
              <li>About&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Press&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Work Here&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Legal&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Privacy Policy&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Terms of Service&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Contact Us&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Cookie Settings&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Cookie Policy&nbsp;&nbsp;&nbsp;&nbsp;</li>
            </ul>
            <ul>
              <h5>STACK EXCHANGE NETWORK</h5>
              <li>Technology&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Culture & recreation&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Life & arts&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Science&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Professional&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Business&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>API&nbsp;&nbsp;&nbsp;&nbsp;</li>
              <li>Data</li>
            </ul>
          </li>
          <div className="snsCopyright">
            <div className="snsContainer">
              <ul>
                <li>Blog</li>
                <li>FaceBook</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className="copyrightContainer">
              <li>Site design / logo © 2022 Stack Exchange Inc; </li>
              <li>user contributions licensed under CC BY-SA. </li>
              <li>rev 2022.12.21.43127</li>
            </div>
          </div>
        </ul>
      </FooterComponent>
    </>
  );
};

export default Footer;
