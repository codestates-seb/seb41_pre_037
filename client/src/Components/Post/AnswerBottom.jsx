import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ShareSheet from "../../Components/Post/ShareSheet";
import { useShareSheetStore } from "../../store/store";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const { handleShareSheet } = useShareSheetStore((state) => state);
  const queryClient = useQueryClient();

  //api 구현하시면 한 번 더 점검하고 테스트해보기
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
    queryClient.invalidateQueries("fetchPost");
  };

  const deleteAnswerOnError = (err) => {
    console.log(err);
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
          {/* <ShareLinker onClick={handleShareSheet}>Share</ShareLinker> */}
          <DeleteButton onClick={handleDeleteAnswerClick}>Delete</DeleteButton>
        </div>

        {/* <ShareSheet /> */}
      </div>
      <AuthorInfoContainer>
        <AuthorProfileImage src={answerData && answerData.image} />
        <AuthorProfileLinker>{answerData && answerData.username}</AuthorProfileLinker>
      </AuthorInfoContainer>
    </AnswerBottomContainer>
  );
}
