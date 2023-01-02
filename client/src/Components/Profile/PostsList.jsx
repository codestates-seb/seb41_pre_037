import React from "react";
import styled from "styled-components/macro";
import QuestionsList from "../Profile/QuestionsList";
import AnswersList from "../Profile/AnswersList";
import QuestionListItem from "./QuestionListItem";

const ItemCard = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 400px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow-y: hidden;
`;

export default function PostsList({ postsListData }) {
  //postsListData = data.profilePosts
  const questionsListData = postsListData && postsListData[0].questions;
  const answersListData = postsListData && postsListData[0].answers;

  return (
    <ItemCard>
      <QuestionsList questionsListData={questionsListData && questionsListData} />
      <AnswersList answersListData={answersListData && answersListData} />
    </ItemCard>
  );
}
