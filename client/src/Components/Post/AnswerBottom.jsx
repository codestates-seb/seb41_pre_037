import styled from "styled-components/macro";
import { useIsLoginStore } from "../../store/loginstore";
import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AnswerBottomContainer = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  width: 100%;
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
  background-color: ${(props) => props.color || "#ffffff"};
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

export default function AnswerBottom({ answerData }) {
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteAnswerData = () => {
    const accessToken = sessionStorage.getItem("accesstoken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "Application/json",
      Accept: "*/*",
      Connection: "keep-alive",
    };

    axios.defaults.withCredentials = true;

    return axios.delete(`${process.env.REACT_APP_SERVER_URI}answers/${answerData.answerId}`, { headers });
  };

  const deleteAnswerOnsuccess = () => {
    window.alert("successfully deleted!");
    queryClient.invalidateQueries("fetchPost");
  };

  const deleteAnswerOnError = (err) => {
    if (err.response.status === 401) {
      window.alert("Please log in first before deleting a answer.");
      navigate("/login");
      setIsLogin(false);
      sessionStorage.clear();
    } else if (err.response.status === 405) {
      window.alert("You can only delete a answer you wrote.");
    }
  };

  const { mutate: deleteAnswer } = useMutation({
    mutationFn: deleteAnswerData,
    onSuccess: deleteAnswerOnsuccess,
    onError: deleteAnswerOnError,
  });

  const handleDeleteAnswerClick = () => {
    deleteAnswer();
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
          <DeleteButton onClick={handleDeleteAnswerClick}>Delete</DeleteButton>
        </div>
      </div>
      <AuthorInfoContainer>
        <AuthorProfileImage src={answerData && answerData.image} />
        <AuthorProfileLinker>{answerData && answerData.username}</AuthorProfileLinker>
      </AuthorInfoContainer>
    </AnswerBottomContainer>
  );
}
