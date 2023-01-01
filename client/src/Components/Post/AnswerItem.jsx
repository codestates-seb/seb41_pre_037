import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ArrowUpIcon from "../../icons/ArrowUpLg.svg";
import ArrowDownIcon from "../../icons/ArrowDownLg.svg";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { defaultStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import AnswerBottom from "./AnswerBottom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AnswerItemContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding: 16px 0 16px 0;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
`;

const VotingButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VotingCounter = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  align-items: center;
  justify-content: center;
  font-size: large;
  color: #6a737c;
`;

const AnswerTopContainer = styled.div`
  min-height: 150px;
`;

export default function AnswerItem({ answerData }) {
  const queryClient = useQueryClient();

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
      console.log(err);
      window.alert("Please login first before voting.");
    } else if (err.response.status === 405) {
      console.log(err);
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
      console.log(err);
      window.alert("Please login first before voting.");
    } else if (err.response.status === 405) {
      console.log(err);
      window.alert("You have already voted");
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
