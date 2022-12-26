import React from "react";
import styled from "styled-components/macro";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillModule from "../../quillModule";
import "../../quillEditor.css";
import BREAKPOINT from "../../breakpoint";

import { useNavigate } from "react-router-dom";

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

export default function PostAnswer() {
  const navigate = useNavigate();

  return (
    <PostBottomContainer>
      <Title>Your Answer</Title>
      <AnswerEditorContainer>
        <ReactQuill theme="snow" modules={quillModule} style={{ height: "250px" }} />
      </AnswerEditorContainer>
      <PostAnswerButton>Post Your Answer</PostAnswerButton>
      <BottomNotice>
        Browse other questions tagged
        <TagsContainer>
          <Tag>javascript</Tag>
          <Tag>fetch-api</Tag>
          <Tag>netlify</Tag>
          <Tag>api-key</Tag>
          <Tag>netlify-function</Tag>
        </TagsContainer>
        or <BottomNoticeLinker onClick={() => {navigate('/askquestions')}}>ask your own question.</BottomNoticeLinker>
      </BottomNotice>
    </PostBottomContainer>
  );
}
