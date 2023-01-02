import React from "react";
import styled from "styled-components/macro";
import PostListItem from "./PostListItem";

const ItemCard = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 400px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow-y: scroll;
`;

export default function PostsList() {
  return (
    <ItemCard>
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </ItemCard>
  );
}
