import Header from "../Components/Header/Header";
import LeftNav from "../Components/LeftNav/LeftNav";
import Footer from "../Components/Footer/Footer";
import ClearIcon from "../icons/Clear.svg";
import EditIcon from "../icons/PencilLg.svg";
import CakeIcon from "../icons/Cake.svg";
import SmallLogo from "../icons/LogoGlyphXxs.svg";
import EmptyPostBox from "../Components/Profile/EmptyPostBox";
import PostsList from "../Components/Profile/PostsList";
import BREAKPOINT from "../breakpoint";
import { React, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dateCalc from "../utils/dateCalc";
import { useIsLoginStore } from "../store/loginstore";

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
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 100%;
    min-width: 0;
  }
`;

const ProfileHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 144px;
  height: max-content;
  justify-content: space-between;
  margin-bottom: 10px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
    min-height: 155px;
    min-width: 0;
  }
`;

const ProfileImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 128px;
  height: 128px;
  margin: 8px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 96px;
    height: 96px;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 64px;
    height: 64px;
  }
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 8px;
  }
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 8px;
  }
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  padding-left: 10px;
`;

const UserDisplayName = styled.span`
  font-size: 32px;
  font-weight: 500;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 20px;
  }
`;

const HeaderInfoBottomContainer = styled.div`
  color: #6a737c;
  font-size: 15px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 12px;
  }
`;

const ProfileHeaderButtonContainer = styled.div`
  display: flex;
  width: 245px;
  justify-content: space-between;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    flex-direction: column;
    height: 80px;
    width: max-content;
  }
`;

const ProfileHeaderButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 120px;
  height: 35px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #929eaa;
  color: #6a737c;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background-color: #f7f9f9;
  }
`;

const ProfileBottomContaner = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    min-width: 0;
    flex-direction: column;
  }
`;

const BottomLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: max-content;
  padding: 12px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    min-width: 0;
    width: calc(100% - 24px);
    padding-bottom: 0px;
  }
`;

const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: max-content;
  padding: 12px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    min-width: 0;
    width: calc(100% - 24px);
    padding-top: 0px;
  }
`;

const BottomItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ItemLabel = styled.label`
  display: block;
  font-size: 22px;
  font-weight: 500;
`;

const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  box-sizing: border-box;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    height: 65px;
  }
`;

const StatsItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 8px;
`;

const StatsCountItem = styled.div`
  display: flex;
  font-size: 20px;
`;

const StatsCountLabel = styled.label`
  color: #6a737c;
  font-size: 15px;
`;

const CommunitiesInnerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 5px 0 5px;
  justify-content: space-between;
  align-items: center;
`;

const Linker = styled.a`
  color: #0074cc;
  font-size: 15px;
  display: inline;
  &:hover {
    color: #49a5f0;
    cursor: pointer;
  }
`;

const Aboutdescription = styled.span`
  color: #6a737c;
  font-size: 15px;
  display: inline;
`;

export default function ProfileDefault() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const params = useParams();
  const signupDate = dateCalc(data && data.profileCreatedAt);
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);

  const fetchData = () => {
    const accessToken = sessionStorage.getItem("accesstoken");
    axios.defaults.withCredentials = true;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "Application/json",
      Accept: "*/*",
    };

    return axios.get(`${process.env.REACT_APP_SERVER_URI}users/${params.id}/${params.username}`, { headers });
  };

  const fetchDataOnSuccess = (response) => {
    response.data.data && setData(response.data.data);
  };

  const fetchDataOnError = (err) => {
    if (err.response.status === 401) {
      window.alert("Please log in first.");
      navigate("/login");
      setIsLogin(false);
      sessionStorage.clear();
    } else if (err.response.status === 405) {
      window.alert("wrong approach!");
      navigate("/");
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchData,
    keepPreviousData: true,
    onSuccess: fetchDataOnSuccess,
    onError: fetchDataOnError,
    retry: false,
  });

  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <ContentContainer>
            <ProfileHeaderContainer>
              <HeaderLeftContainer>
                <ProfileImage src={data && data.image} />
                <HeaderInfoContainer>
                  <UserDisplayName>{data && data.username}</UserDisplayName>
                  <HeaderInfoBottomContainer>
                    <img src={CakeIcon} alt="cake icon" />
                    {`member for ${signupDate}`}
                  </HeaderInfoBottomContainer>
                </HeaderInfoContainer>
              </HeaderLeftContainer>
              <ProfileHeaderButtonContainer>
                <ProfileHeaderButton>
                  <img
                    src={EditIcon}
                    css={`
                      margin-right: 3px;
                    `}
                    alt="edit icon"
                  />
                  Edit profile
                </ProfileHeaderButton>
                <ProfileHeaderButton>
                  <img
                    src={ClearIcon}
                    css={`
                      margin-right: 3px;
                    `}
                    alt="clear icon"
                  />
                  Delete profile
                </ProfileHeaderButton>
              </ProfileHeaderButtonContainer>
            </ProfileHeaderContainer>
            <ProfileBottomContaner>
              <BottomLeftContainer>
                <BottomItemContainer>
                  <ItemLabel>Stats</ItemLabel>
                  <ItemCard>
                    <StatsItemContainer>
                      <StatsCountItem>{data && data.totalMyAnswers}</StatsCountItem>
                      <StatsCountLabel>answers</StatsCountLabel>
                    </StatsItemContainer>
                    <StatsItemContainer>
                      <StatsCountItem>{data && data.totalMyQuestions}</StatsCountItem>
                      <StatsCountLabel>questions</StatsCountLabel>
                    </StatsItemContainer>
                  </ItemCard>
                </BottomItemContainer>
                <BottomItemContainer>
                  <ItemLabel>Communities</ItemLabel>
                  <ItemCard
                    css={`
                      height: 55px;
                    `}
                  >
                    <CommunitiesInnerContainer>
                      <div>
                        <img src={SmallLogo} alt="small logo" />
                        <Linker onClick={() => navigate("/")}>Stack Overflow</Linker>
                      </div>
                      1
                    </CommunitiesInnerContainer>
                  </ItemCard>
                </BottomItemContainer>
              </BottomLeftContainer>
              <BottomRightContainer>
                <BottomItemContainer>
                  <ItemLabel>About</ItemLabel>
                  <ItemCard
                    css={`
                      justify-content: center;
                      background-color: #f8f9f9;
                    `}
                  >
                    <div
                      css={`
                        display: inline;
                      `}
                    >
                      <Aboutdescription>
                        Your about me section is currently blank. Would you like to add one?
                      </Aboutdescription>
                      <Linker>Edit profile</Linker>
                    </div>
                  </ItemCard>
                </BottomItemContainer>
                <BottomItemContainer>
                  <ItemLabel>All posts</ItemLabel>
                  <div>View all questions and answers</div>
                  <PostsList postsListData={data && data.profilePosts} />
                  {/* <EmptyPostBox /> */}
                </BottomItemContainer>
              </BottomRightContainer>
            </ProfileBottomContaner>
          </ContentContainer>
        )}
      </Container>
      <Footer />
    </>
  );
}
