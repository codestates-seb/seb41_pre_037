import NavComponent from "../LeftNav/NavComponent";
import { useLeftNavStore } from "../../store/store";
import styled from "styled-components/macro";

const MobileLeftNavBackdrop = styled.div`
  display: flex;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const MobileLeftNavView = styled.div`
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
  height: 134px;
  left: 0;
  margin-top: 50px;
`;

const MobileLeftNav = () => {
  const { showLeftNav, handleLeftNav } = useLeftNavStore((state) => state);
  return (
    <>
      {showLeftNav === true ? (
        <MobileLeftNavBackdrop onClick={handleLeftNav}>
          <MobileLeftNavView onClick={(e) => e.stopPropagation()}>
            <NavComponent />
          </MobileLeftNavView>
        </MobileLeftNavBackdrop>
      ) : null}
    </>
  );
};

export default MobileLeftNav;
