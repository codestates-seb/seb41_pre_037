import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../breakpoint";
import Header from "../Components/Header/Header";
import LeftNav from "../Components/LeftNav/LeftNav";
import Footer from "../Components/Footer/Footer";
import ClearIcon from "../icons/Clear.svg";
import EditIcon from "../icons/PencilLg.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  max-width: 1260px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  padding: 24px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 100%;
    min-width: 0;
  }
  background-color: #a7d6ff;
`;

const ProfileHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 144px;
  height: max-content;
  justify-content: flex-start;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
    min-width: 0;
  }
  background-color: pink;
`;

const DummyProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 128px;
  height: 128px;
  margin: 8px;
  background-color: green;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 96px;
    height: 96px;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 64px;
    height: 64px;
  }
`;

const ProfileHeaderButtonContainer = styled.div`
  display: flex;
  margin: 8px;
`;

const ProfileHeaderButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 120px;
  height: 30px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #000000;
  font-size: 13px;
`;

export default function ProfileDefault() {
  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        <ContentContainer>
          <ProfileHeaderContainer>
            <DummyProfileImage />
            <ProfileHeaderButtonContainer>
              <ProfileHeaderButton>
                <img
                  src={EditIcon}
                  css={`
                    margin-right: 3px;
                  `}
                />
                Edit profile
              </ProfileHeaderButton>
              <ProfileHeaderButton>
                <img
                  src={ClearIcon}
                  css={`
                    margin-right: 3px;
                  `}
                />
                Delete profile
              </ProfileHeaderButton>
            </ProfileHeaderButtonContainer>
          </ProfileHeaderContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
