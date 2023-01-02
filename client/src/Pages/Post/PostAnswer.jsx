import React, { useState } from "react";
import styled from "styled-components/macro";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillModule from "../../quillModule";
import "../../quillEditor.css";
import BREAKPOINT from "../../breakpoint";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsLoginStore } from "../../store/loginstore";

const PostBottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  flex-direction: column;
`;

const Title = styled.h1`
  all: unset;
  display: block;
  font-size: 21px;
  font-weight: 400;
  padding: 20px 0 20px 0;
`;

const AnswerEditorContainer = styled.div`
  margin-top: 10px;
  height: 300px;
`;

const PostAnswerButton = styled.button`
  width: 130px;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
  margin: 20px 0 20px 0;
  display: block;

  &:hover {
    background-color: #306fa0;
    color: #aeaeae;
    border: 1px solid #306fa0;
    box-shadow: inset 0 1px 0 0 #65869e;
    cursor: pointer;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    margin-right: 10px;
  }
`;

const ErrorMessage = styled.p`
  width: 80%;
  font-size: 15px;
  margin-top: 5px;
  color: #de4f54;
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
  display: inline;
`;

const TagsContainer = styled.div`
  display: inline;
  align-items: center;
  width: max-content;
  height: max-content;
  margin: 0 10px 0 10px; ;
`;

const BottomNotice = styled.h2`
  all: unset;
  display: inline;
  font-size: 17px;
  font-weight: 400;
  margin: 16px 0 16px 0;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 100%;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
  }
`;

const BottomNoticeLinker = styled.a`
  all: unset;
  display: inline;
  color: #2880d1;
  cursor: pointer;

  &:hover {
    color: #4293f8;
  }
`;

export default function PostAnswer({ postData }) {
  const navigate = useNavigate();
  const [answerInput, setAnswerInput] = useState();
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const params = useParams();
  const queryClient = useQueryClient();

  const postAnswerData = () => {
    const accessToken = sessionStorage.getItem("accesstoken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "Application/json",
      Accept: "*/*",
    };

    axios.defaults.withCredentials = true;

    return axios.post(
      `${process.env.REACT_APP_SERVER_URI}answers/${params.id}`,
      { answerContent: answerInput },
      { headers }
    );
  };

  const postAnswerOnsuccess = () => {
    queryClient.invalidateQueries("fetchPost");
    setAnswerInput("");
  };

  const postAnswerOnError = (err) => {
    if (err.response.status === 401) {
      setIsLogin(false);
      sessionStorage.clear();
    }
  };

  const { mutate: postAnswer } = useMutation({
    mutationFn: postAnswerData,
    onSuccess: postAnswerOnsuccess,
    onError: postAnswerOnError,
  });

  const handlePostAnswerClick = () => {
    postAnswer();
  };

  return (
    <PostBottomContainer>
      <Title>Your Answer</Title>
      <AnswerEditorContainer>
        <ReactQuill
          theme="snow"
          modules={quillModule}
          style={{ height: "250px" }}
          value={answerInput}
          onChange={(content) => {
            setAnswerInput(content);
          }}
        />
      </AnswerEditorContainer>
      <PostAnswerButton onClick={handlePostAnswerClick}>Post Your Answer</PostAnswerButton>
      {isLogin ? null : <ErrorMessage>Please log in first before writing a answer.</ErrorMessage>}
      <BottomNotice>
        Browse other questions tagged
        <TagsContainer>
          {postData &&
            postData.tag.map((tag) => {
              return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
            })}
        </TagsContainer>
        or
        <BottomNoticeLinker
          onClick={() => {
            navigate("/askquestions");
          }}
        >
          ask your own question.
        </BottomNoticeLinker>
      </BottomNotice>
    </PostBottomContainer>
  );
}
