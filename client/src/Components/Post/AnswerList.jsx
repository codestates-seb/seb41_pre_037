import AnswerItem from "./AnswerItem";
import React from "react";
import styled from "styled-components/macro";

const AnswerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AnswerListInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AnswerListHeader = styled.h2`
  all: unset;
  font-size: 21px;
  margin: 20px 0 10px 0;
`;

export default function AnswerList({ answersData }) {
  //answersData === post.answers
  return (
    <AnswerListContainer>
      <AnswerListHeader>
        <span
          css={`
            margin-right: 5px;
          `}
        >
          {answersData && answersData.length}
        </span>
        Answers
      </AnswerListHeader>
      <AnswerListInnerContainer>
        {answersData &&
          answersData.map((answerData) => <AnswerItem answerData={answerData} key={answerData.answerId} />)}
      </AnswerListInnerContainer>
    </AnswerListContainer>
  );
}
