import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import "../../index.css";

const StickyLeftNavContainer = styled.nav`
  width: 164px;
  height: 160px;
  position: sticky;
  top: 50px;
  z-index: 10;
`;

const LeftNavMenuContainer = styled.ul`
  all: unset;
  width: 164px;
  flex-direction: column;
`;

const LeftNavMenu = styled.li`
  all: unset;
  width: 164px;
  height: 34px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif; //이거 그냥 index.css에 *로 넣으면 안될까

  font-size: small;
  color: rgb(81, 81, 81);

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
  width: 164px;
  height: 34px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif; //이거 그냥 index.css에 *로 넣으면 안될까

  font-size: small;
  color: rgb(81, 81, 81);
`;

const NavComponent = () => {
  return (
    <StickyLeftNavContainer>
      <LeftNavMenuContainer>
        <LeftNavMenu
          className="current-page"
          css={`
            padding-left: 10px;
          `}
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
          css={`
            padding-left: 30px;
          `}
        >
          <span>Tags</span>
        </LeftNavMenu>
        <LeftNavMenu
          css={`
            padding-left: 30px;
          `}
        >
          <span>Users</span>
        </LeftNavMenu>
      </LeftNavMenuContainer>
    </StickyLeftNavContainer>
  );
};

export default NavComponent;
