import AnswerListItem from "./AnswerListItem";
import React from "react";
import styled from "styled-components/macro";

const AnswerListInnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default function AnswersList({ answersListData }) {
  //answersListData = postsListData && postsListData[0].answers;
  return (
    <>
      <AnswerListInnerContainer>
        {answersListData &&
          answersListData.map((answersListData) => (
            <AnswerListItem
              answersListData={answersListData && answersListData}
              key={answersListData && answersListData.answerId}
            />
          ))}
      </AnswerListInnerContainer>
    </>
  );
}
