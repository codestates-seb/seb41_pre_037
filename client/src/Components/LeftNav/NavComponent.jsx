import styled from "styled-components/macro";
import "../../index.css";
import { useLocation, useNavigate } from "react-router-dom";

const StickyLeftNavContainer = styled.nav`
  height: 160px;
  position: sticky;
  top: 50px;
  width: 164px;
  z-index: 10;
`;

const LeftNavMenuContainer = styled.ul`
  all: unset;
  flex-direction: column;
  width: 164px;
`;

const LeftNavMenu = styled.li`
  all: unset;
  align-items: center;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  color: rgb(81, 81, 81);
  display: flex;
  font-size: small;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  height: 34px;
  width: 164px;

  > span {
    cursor: pointer;
  }

  > :hover {
    color: rgb(0, 0, 0);
  }

  &.current-page {
    background-color: rgb(241, 242, 243);
    border-right: 3px solid rgb(244, 130, 36);
  }
`;

const LeftNavMenuPublic = styled.li`
  all: unset;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  color: rgb(81, 81, 81);
  display: flex;
  font-size: small;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  height: 34px;
  width: 164px;
`;

const NavComponent = () => {
  const navigate = useNavigate();
  const curruntPath = useLocation().pathname;

  return (
    <StickyLeftNavContainer>
      <LeftNavMenuContainer>
        <LeftNavMenu
          className={curruntPath === "/" ? "current-page" : null}
          css={`
            padding-left: 10px;
          `}
          onClick={() => navigate("/")}
        >
          <span
            css={`
              font-weight: 700;
            `}
          >
            Home
          </span>
        </LeftNavMenu>
        <LeftNavMenuPublic
          css={`
            padding-left: 10px;
          `}
        >
          <span
            css={`
              font-weight: 300;
            `}
          >
            PUBLIC
          </span>
        </LeftNavMenuPublic>
        <LeftNavMenu
          className={curruntPath === "/tags" ? "current-page" : null}
          css={`
            padding-left: 30px;
          `}
          onClick={() => navigate("/tags")}
        >
          <span>Tags</span>
        </LeftNavMenu>
        <LeftNavMenu
          className={curruntPath === "/users" ? "current-page" : null}
          css={`
            padding-left: 30px;
          `}
          onClick={() => navigate("/users")}
        >
          <span>Users</span>
        </LeftNavMenu>
      </LeftNavMenuContainer>
    </StickyLeftNavContainer>
  );
};

export default NavComponent;
