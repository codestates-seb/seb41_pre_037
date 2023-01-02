import AnswerBottom from "./AnswerBottom";
import { useIsLoginStore } from "../../store/loginstore";
import "react-quill/dist/quill.bubble.css";
import React from "react";
import styled from "styled-components/macro";
import ReactQuill from "react-quill";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnswerItemContainer = styled.div`
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  padding: 16px 0 16px 0;
  width: 100%;
`;

const AnswerItemInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 52px);
`;

const VotingComponentConatiner = styled.div`
  display: flex;
  height: 100%;
  margin-right: 16px;
`;

const VotingComponent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
`;

const VotingButton = styled.button`
  align-items: center;
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const VotingCounter = styled.div`
  align-items: center;
  color: #6a737c;
  display: flex;
  font-size: large;
  height: 28px;
  justify-content: center;
  width: 100%;
`;

const AnswerTopContainer = styled.div`
  min-height: 150px;
`;

export default function AnswerItem({ answerData }) {
  const queryClient = useQueryClient();
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const navigate = useNavigate();

  const postUpVoteData = () => {
    const accessToken = sessionStorage.getItem("accesstoken");

    const REQUESTBODY = "upvote";

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "Application/json",
      Accept: "*/*",
    };

    axios.defaults.withCredentials = true;

    return axios.post(`${process.env.REACT_APP_SERVER_URI}answers/${answerData.answerId}/vote/2`, REQUESTBODY, {
      headers,
    });
  };

  const postUpVoteOnsuccess = () => {
    queryClient.invalidateQueries("fetchPost");
  };

  const postUpVoteOnError = (err) => {
    if (err.response.status === 401) {
      window.alert("Please log in first before voting.");
      navigate("/login");
      setIsLogin(false);
      sessionStorage.clear();
    } else if (err.response.status === 405) {
      window.alert("You have already voted");
    }
  };

  const { mutate: postUpVote } = useMutation({
    mutationFn: postUpVoteData,
    onSuccess: postUpVoteOnsuccess,
    onError: postUpVoteOnError,
  });

  const handlePostUpVoteClick = () => {
    postUpVote();
  };

  const postDownVoteData = () => {
    const accessToken = sessionStorage.getItem("accesstoken");

    const REQUESTBODY = "downvote";

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "Application/json",
      Accept: "*/*",
    };

    axios.defaults.withCredentials = true;

    return axios.post(`${process.env.REACT_APP_SERVER_URI}answers/${answerData.answerId}/vote/3`, REQUESTBODY, {
      headers,
    });
  };

  const postDownVoteOnsuccess = () => {
    queryClient.invalidateQueries("fetchPost");
  };

  const postDownVoteOnError = (err) => {
    if (err.response.status === 401) {
      window.alert("Please log in first before voting.");
      navigate("/login");
      setIsLogin(false);
      sessionStorage.clear();
    } else if (err.response.status === 405) {
      window.alert("You have already voted.");
    }
  };

  const { mutate: postDownVote } = useMutation({
    mutationFn: postDownVoteData,
    onSuccess: postDownVoteOnsuccess,
    onError: postDownVoteOnError,
  });

  const handlePostDownVoteClick = () => {
    postDownVote();
  };
  return (
    <AnswerItemContainer>
      <VotingComponentConatiner>
        <VotingComponent>
          <VotingButton onClick={handlePostUpVoteClick}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 25H34L18 9L2 25Z"
                fill="#BABFC3"
                css={`
                  &:active {
                    fill: #f48224;
                  }
                `}
              />
            </svg>
          </VotingButton>
          <VotingCounter>{answerData.answerVoteCount}</VotingCounter>
          <VotingButton onClick={handlePostDownVoteClick}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 11H34L18 27L2 11Z"
                fill="#BABFC3"
                css={`
                  &:active {
                    fill: #f48224;
                  }
                `}
              />
            </svg>
          </VotingButton>
        </VotingComponent>
      </VotingComponentConatiner>
      <AnswerItemInnerContainer>
        <AnswerTopContainer>
          <ReactQuill theme="bubble" value={answerData.answerContent} readOnly={true} />
        </AnswerTopContainer>
        <AnswerBottom answerData={answerData} />
      </AnswerItemInnerContainer>
    </AnswerItemContainer>
  );
}
