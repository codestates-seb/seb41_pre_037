import QuestionListItem from "./QuestionListItem";
import React from "react";
import styled from "styled-components/macro";

const QuestionListInnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default function QuestionsList({ questionsListData }) {
  //questionsListData = postsListData && postsListData[0].questions;
  return (
    <>
      <QuestionListInnerContainer>
        {questionsListData &&
          questionsListData.map((questionsListData) => (
            <QuestionListItem
              questionsListData={questionsListData && questionsListData}
              key={questionsListData && questionsListData.questionId}
            />
          ))}
      </QuestionListInnerContainer>
    </>
  );
}
