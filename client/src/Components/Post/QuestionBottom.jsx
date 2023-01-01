import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ShareSheet from "./ShareSheet";
import { useState } from "react";
import { useShareSheetStore } from "../../store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AnswerBottomContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: space-between;
  align-items: flex-start;
`;

const ShareLinker = styled.a`
  color: #525960;

  &:hover {
    cursor: pointer;
    color: #7f8a95;
  }
`;

const DeleteButton = styled.span`
  color: #a00000;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
    color: #c50000;
  }
`;

const AuthorInfoContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #d9e9f7;
  padding: 7px;
  min-width: 200px;
  min-height: 65px;
`;

const AuthorProfileImage = styled.img`
  width: 32px;
  height: 32px;
`;

const AuthorProfileLinker = styled.a`
  all: unset;
  font-size: 14px;
  margin-left: 10px;
  color: #2880d1;
  cursor: pointer;

  &:hover {
    color: #4293f8;
  }
`;

export default function QuestionBottom({ postData }) {
  const [handleShareSheet, setHandleShareSheet] = useState(false);
  const navigate = useNavigate();

  const deleteQuestionData = () => {
    const accessToken = sessionStorage.getItem("accesstoken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "Application/json",
      Accept: "*/*",
      Connection: "keep-alive",
    };

    axios.defaults.withCredentials = true;

    return axios.delete(`${process.env.REACT_APP_SERVER_URI}questions/${postData.questionId}`, { headers });
  };

  const deleteQuetionOnsuccess = () => {
    window.alert("successfuly deleted questions!");
    navigate("/");
  };

  const deleteQuestionOnError = (err) => {
    console.log(err);
  };

  const { mutate: deleteQuestion } = useMutation({
    mutationFn: deleteQuestionData,
    onSuccess: deleteQuetionOnsuccess,
    onError: deleteQuestionOnError,
  });

  const handleDeleteQuestionClick = () => {
    deleteQuestion();
  };

  const shareSheetHandler = (e) => {
    setHandleShareSheet(!handleShareSheet);
  };
  console.log(handleShareSheet);

  return (
    <AnswerBottomContainer>
      <div
        css={`
          position: relative;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <ShareLinker onClick={shareSheetHandler}>Share</ShareLinker>
          <ShareSheet handleShareSheet={handleShareSheet} />
          <DeleteButton onClick={handleDeleteQuestionClick}>Delete</DeleteButton>
        </div>
        <ShareSheet />
      </div>
      <AuthorInfoContainer>
        <AuthorProfileImage src={postData && postData.image} />
        <AuthorProfileLinker>{postData && postData.username}</AuthorProfileLinker>
      </AuthorInfoContainer>
    </AnswerBottomContainer>
  );
}
