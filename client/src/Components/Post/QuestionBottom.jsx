import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ShareSheet from "./ShareSheet";
import { useShareSheetStore } from "../../store/store";

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

const AuthorProfileImageArea = styled.div`
  width: 32px;
  height: 32px;
  background-color: green;
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

export default function QuestionBottom() {
  const { handleShareSheet } = useShareSheetStore((state) => state);
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
          <ShareLinker onClick={handleShareSheet}>Share</ShareLinker>
          <DeleteButton>Delete</DeleteButton>
        </div>

        <ShareSheet />
      </div>
      <AuthorInfoContainer>
        <AuthorProfileImageArea />
        <AuthorProfileLinker>joenpc npcsolution</AuthorProfileLinker>
      </AuthorInfoContainer>
    </AnswerBottomContainer>
  );
}
