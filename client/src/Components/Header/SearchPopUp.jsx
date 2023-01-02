import SearchPopUpComponent from "./SearchPopUpComponent";
import { useSearchPopUpStore } from "../../store/store";
import styled from "styled-components/macro";

const SearchPopUpBackdrop = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const SearchPopUp = () => {
  const { showPopUp, handlePopUp } = useSearchPopUpStore((state) => state);
  return (
    <>
      {showPopUp === true ? (
        <SearchPopUpBackdrop onClick={handlePopUp}>
          <SearchPopUpComponent />
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default SearchPopUp;
