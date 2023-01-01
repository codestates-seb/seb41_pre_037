import React from "react";
import styled from "styled-components/macro";
import EmptyPostBackground from "../../icons/EmptyPostBackground.png";

const ItemCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  padding: 12px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #f8f9f9;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  height: max-content;
`;

const Linker = styled.a`
  color: #0074cc;
  font-size: 15px;
  display: inline;
  margin: 0 5px 0 5px;
  &:hover {
    color: #49a5f0;
    cursor: pointer;
  }
`;

const Description = styled.span`
  color: #6a737c;
  font-size: 15px;
  display: inline;
`;

export default function EmptyPostBox() {
  return (
    <>
      <ItemCard>
        <InnerContainer>
          <img src={EmptyPostBackground} width="196px" height="196px" />
          <p
            css={`
              align-items: center;
            `}
          >
            <Description
              css={`
                display: block;
                margin-bottom: 10px;
                text-align: center;
              `}
            >
              Just getting started? Try answering a question!
            </Description>
            <p
              css={`
                display: inline;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <Description
                css={`
                  display: block;
                  text-align: center;
                `}
              >
                Your most helpful questions, answers and tags will appear here.
              </Description>
              <Linker>answering a question</Linker>
              <Description>or</Description>
              <Linker>selecting tags</Linker>
              <Description>that match topics you’re interested in.</Description>
            </p>
          </p>
        </InnerContainer>
      </ItemCard>
    </>
  );
}
