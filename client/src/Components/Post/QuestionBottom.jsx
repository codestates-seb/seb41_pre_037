import ShareSheet from "./ShareSheet";
import { useIsLoginStore } from "../../store/loginstore";
import React from "react";
import styled from "styled-components/macro";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AnswerBottomContainer = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  width: 100%;
`;

const ShareLinker = styled.a`
  color: #525960;

  &:hover {
    color: #7f8a95;
    cursor: pointer;
  }
`;

const DeleteButton = styled.span`
  color: #a00000;
  margin-left: 10px;

  &:hover {
    color: #c50000;
    cursor: pointer;
  }
`;

const AuthorInfoContainer = styled.div`
  align-items: center;
  background-color: #d9e9f7;
  box-sizing: border-box;
  display: flex;
  padding: 7px;
  min-height: 65px;
  min-width: 200px;
`;

const AuthorProfileImage = styled.img`
  height: 32px;
  width: 32px;
`;

const AuthorProfileLinker = styled.a`
  all: unset;
  color: #2880d1;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    color: #4293f8;
  }
`;

export default function QuestionBottom({ postData }) {
  const [handleShareSheet, setHandleShareSheet] = useState(false);
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
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
    window.alert("successfuly deleted!");
    navigate("/");
  };

  const deleteQuestionOnError = (err) => {
    if (err.response.status === 401) {
      window.alert("Please log in first before deleting a post.");
      navigate("/login");
      setIsLogin(false);
      sessionStorage.clear();
    } else if (err.response.status === 405) {
      window.alert("You can only delete a post you wrote.");
    }
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
