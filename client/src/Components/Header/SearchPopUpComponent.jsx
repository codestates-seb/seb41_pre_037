import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";

const SearchPopUpView = styled.div`
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100px;
  margin-top: 55px;
  width: 40vw;
`;

const SearchType = styled.span`
  font-size: medium;
  font-weight: 500;
  margin-left: 5px;
  text-align: left;
`;

const SearchDescription = styled.span`
  font-size: small;
  margin-left: 5px;
  text-align: left;
`;

const SearchPopUpTextContainer = styled.div`
  align-items: center;
  display: flex;
  width: 50%;
`;

const SearchPopUpInnerContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50%;
  width: 100%;
`;

const Button = styled.button`
  all: unset;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: small;
  font-weight: 400;
  height: 25px;
  margin-left: 2%;
  text-align: center;
  width: 100px;

  &:hover {
    background-color: rgb(185, 210, 232);
    cursor: pointer;
  }
`;

const SearchPopUpComponent = () => {
  const navigate = useNavigate();

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
          <Button
            onClick={() => {
              navigate("/askquestions");
            }}
          >
            Ask a question
          </Button>
        </SearchPopUpInnerContainer>
      </SearchPopUpView>
    </>
  );
};

export default SearchPopUpComponent;
