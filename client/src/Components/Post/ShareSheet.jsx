import React from "react";
import styled from "styled-components/macro";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";

const ShareSheetContainer = styled.div`
  display: flex;
  left: -10px;
  position: absolute;
  top: 25px;
`;

const ShareSheetTooltip = styled.div`
  position: relative;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 0.4em;
  box-shadow: 0 1px 3px #0000000f, 0 2px 6px #0000000f, 0 3px 8px #00000017;
  box-sizing: border-box;
  height: 115px;
  width: 340px;

  &:before {
    background-color: #ffffff;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 28px;
    left: 12px;
    position: absolute;
    transform: rotate(45deg);
    top: -2px;
    width: 28px;
    z-index: 2;
  }

  &:after {
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    box-shadow: 0 1px 3px #0000000f, 0 2px 6px #0000000f, 0 3px 8px #00000017;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 30px;
    left: 10px;
    position: absolute;
    transform: rotate(45deg);
    top: -3px;
    width: 30px;
    z-index: -2;
  }
`;

const ShareSheetInnerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 115px;
  justify-content: space-between;
  padding: 12px;
  position: absolute;
  width: 340px;
  z-index: 10;
`;

const Label = styled.div`
  box-sizing: border-box;
  display: block;
  font-weight: 600;
  font-size: 15px;
`;

const ShareLinkInput = styled.input`
  box-sizing: border-box;
  color: #525960;
  display: block;
  height: 30px;
  padding: 0 5px 0 5px;
  width: 316px;
`;

const ShareSheetBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Linker = styled.a`
  all: unset;
  color: #2880d1;
  cursor: pointer;
  display: inline;
  font-size: 15px;

  &:hover {
    color: #4293f8;
  }
`;

const SNSContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const handleCopyClipBoard = async (text) => {
  await navigator.clipboard.writeText(text);
};

export default function ShareSheet({ handleShareSheet }) {
  return (
    <>
      {handleShareSheet ? (
        <ShareSheetContainer>
          <ShareSheetInnerContainer>
            <Label>Share a link to this question</Label>
            <ShareLinkInput value={window.location.href} />
            <ShareSheetBottomContainer>
              <Linker onClick={() => handleCopyClipBoard(window.location.href)}>Copy Link</Linker>
              <SNSContainer>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon
                    size={18}
                    css={`
                      border-radius: 2px;
                    `}
                  ></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton style={{ marginLeft: "10px" }} url={window.location.href}>
                  <TwitterIcon
                    size={18}
                    css={`
                      border-radius: 2px;
                    `}
                  ></TwitterIcon>
                </TwitterShareButton>
              </SNSContainer>
            </ShareSheetBottomContainer>
          </ShareSheetInnerContainer>
          <ShareSheetTooltip />
        </ShareSheetContainer>
      ) : null}
    </>
  );
}
