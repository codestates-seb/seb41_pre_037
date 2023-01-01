import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import { useIsLoginStore } from "../../store/loginstore";
import QuestionBottom from "../../Components/Post/QuestionBottom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostTopContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 16px;
`;

const PostTopInnerContainer = styled.div`
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

const QuestionTopContainer = styled.div`
  min-height: 150px;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: 20px 5px 20px 0;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
    display: inline;
  }
`;

const Tag = styled.div`
  width: max-content;
  padding: 5px 8px;
  height: 15px;
  border: 1px #e1ecf4;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #39739d;
  font-size: small;
  margin-right: 5px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: inline;
    padding: 5px;
  }
`;

export default function Question({ postData }) {
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

    return axios.post(`${process.env.REACT_APP_SERVER_URI}questions/${postData.questionId}/vote/2`, REQUESTBODY, {
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
      window.alert("You have already voted.");
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

    return axios.post(`${process.env.REACT_APP_SERVER_URI}questions/${postData.questionId}/vote/3`, REQUESTBODY, {
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
    <PostTopContainer>
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
          <VotingCounter>{postData && postData.questionVoteCount}</VotingCounter>
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
      <PostTopInnerContainer>
        <QuestionTopContainer>
          <ReactQuill theme="bubble" value={postData && postData.questionProblemBody} readOnly={true} />
          <ReactQuill theme="bubble" value={postData && postData.questionTryOrExpectingBody} readOnly={true} />
        </QuestionTopContainer>
        <TagsContainer>
          {postData &&
            postData.tag.map((tag) => {
              return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
            })}
        </TagsContainer>
        <QuestionBottom postData={postData && postData} />
      </PostTopInnerContainer>
    </PostTopContainer>
  );
}
