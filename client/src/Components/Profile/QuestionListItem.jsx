import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import QuestionIcon from "../../icons/Question.svg";
import dateCalc from "../../utils/dateCalc";

const ListItemContainer = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  border-bottom: 1px solid #b5b5b5;
  box-sizing: border-box;
`;

const ItemLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NumberLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 20px;
  background-color: #74b981;
  border-radius: 3px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  margin: 0 10px 0 10px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 20px;
    height: 15px;
    font-size: 10px;
    margin: 0 5px 0 5px;
  }
`;

const Linker = styled.a`
  color: #0074cc;
  font-size: 15px;
  display: inline;
  &:hover {
    color: #49a5f0;
    cursor: pointer;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 12px;
  }
`;

const CreatedInfo = styled.div`
  display: flex;
  color: #6a737c;
  font-size: 15px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 12px;
  }
`;

export default function QuestionListItem({ questionsListData }) {
  const date = dateCalc(questionsListData && questionsListData.questionCreatedAt);
  const navigate = useNavigate();

  return (
    <>
      <ListItemContainer>
        <ItemLeftContainer>
          <img src={QuestionIcon} alt="question icon" />
          <NumberLabel>{questionsListData.questionVoteCount}</NumberLabel>
          <Linker
            onClick={() => {
              navigate(`/post/${questionsListData.questionId}/${questionsListData.questionTitle.replaceAll(" ", "-")}`);
            }}
          >
            {questionsListData.questionTitle}
          </Linker>
        </ItemLeftContainer>
        <CreatedInfo>{`asked at ${date}`}</CreatedInfo>
      </ListItemContainer>
    </>
  );
}
