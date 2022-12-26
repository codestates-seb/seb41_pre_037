import styled from "styled-components/macro";

const SearchPopUpView = styled.div`
  border-radius: 3px;
  background-color: #ffffff;
  height: 100px;
  width: 40vw;
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

const SearchType = styled.span`
  text-align: left;
  font-size: medium;
  font-weight: 500;
  margin-left: 5px;
`;

const SearchDescription = styled.span`
  text-align: left;
  font-size: small;
  margin-left: 5px;
`;

const SearchPopUpTextContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;

const SearchPopUpInnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
`;

const Button = styled.button`
  all: unset;
  width: 100px;
  height: 25px;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: small;
  font-weight: 400;
  text-align: center;

  margin-left: 2%;

  &:hover {
    background-color: rgb(185, 210, 232);
  }
`;

const SearchPopUpComponent = () => {
  return (
    <>
      <SearchPopUpView onClick={(e) => e.stopPropagation()}>
        <SearchPopUpInnerContainer
          css={`
            border-bottom: 1px solid rgb(215, 215, 215);
          `}
        >
          <SearchPopUpTextContainer>
            <SearchType>user:1234</SearchType> <SearchDescription>search by author</SearchDescription>
          </SearchPopUpTextContainer>
          <SearchPopUpTextContainer>
            <SearchType> answers:0</SearchType> <SearchDescription>unanswered questions</SearchDescription>
          </SearchPopUpTextContainer>
        </SearchPopUpInnerContainer>
        <SearchPopUpInnerContainer>
          <Button>Ask a question</Button>
        </SearchPopUpInnerContainer>
      </SearchPopUpView>
    </>
  );
};

export default SearchPopUpComponent;
