import React from "react";
import styled from "styled-components/macro";
import { useIsLoginStore } from "../../store/loginstore";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AnswerBottomContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: space-between;
  align-items: flex-start;
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
  background-color: ${(props) => props.color || "#ffffff"};
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
