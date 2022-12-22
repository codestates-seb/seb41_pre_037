import { useState } from "react";
import styled from "styled-components/macro";
import { useLeftNavStore } from "../../store";

const MobileLeftNavBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const MobileLeftNavView = styled.div`
  background-color: #ffffff;
  width: 240px;
  height: 160px; //padding-top: 24px, 각 메뉴당 34px * 4
  left: 0;
  margin-top: 50px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

const MobileLeftNav = () => {
  const { showLeftNav, handleLeftNav } = useLeftNavStore((state) => state);
  return (
    <>
      {showLeftNav === true ? (
        <MobileLeftNavBackdrop onClick={handleLeftNav}>
          <MobileLeftNavView onClick={(e) => e.stopPropagation()}>
            <p>Left Nav 영역입니다</p>
          </MobileLeftNavView>
        </MobileLeftNavBackdrop>
      ) : null}
    </>
  );
};

export default MobileLeftNav;
