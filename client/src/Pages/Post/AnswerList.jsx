import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import AnswerItem from "./AnswerItem";

const AnswerListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const AnswerListInnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const AnswerListHeader = styled.h2`
  all: unset;
  font-size: 21px;
  margin: 20px 0 10px 0;
`;

export default function AnswerList() {
  return (
    <AnswerListContainer>
      <AnswerListHeader>2 Answers</AnswerListHeader>
      <AnswerListInnerContainer>
        <AnswerItem />
        <AnswerItem />
      </AnswerListInnerContainer>
    </AnswerListContainer>
  );
}
