import styled from "styled-components";
import PencilIcon from "../../icons/Pencil.svg";
import LogoGraysm from "../../icons/LogoGraysm.svg";
import Comment from "../../icons/Comment.svg";
import { useState } from "react";

import BREAKPOINT from "../../breakpoint";

const Container = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    display: none;
  }
`;
const BlogContainer = styled.ul`
  padding: 0px;
  width: 270px;
  height: fit-content;
  border-radius: 5%;
  list-style: none;
  box-sizing: border-box;
  box-shadow: 0 5px 5px gray;
  border: 1px solid #ead792;
  border-radius: 5px;
`;
const ListHead = styled.li`
  background-color: #f9ebb8;
  width: 100%;
  height: 8%;
  border: 1px solid #ead792;
  border-radius: ${(props) => (props.radius ? props.radius : 0)};
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : "1px")};
  list-style: none;
  padding: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: small;
  color: #535353;
  box-sizing: inherit;
`;

const ListItem = styled.li`
  display: flex;
  background-color: #fff7db;
  width: 100%;
  height: fit-content;
  padding: 8px;
  margin: 0;
  font-size: small;
  box-sizing: inherit;
  border-radius: ${(props) => (props.radius ? props.radius : 0)};
`;

const ListText = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;
const ListIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 5px;
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const RelatedTagsContainer = styled.div`
  width: max-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const RelateTagsHead = styled.h2`
  font-weight: 500;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  width: max-content;
  height: fit-content;
  display: flex;
  margin-bottom: 10px;
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
`;
const TagCount = styled.p`
  height: max-content;
  color: gray;
  margin: 0;
  margin-left: 5px;
  padding-top: 7px;
  font-size: small;
`;
const TagLoader = styled.p`
  color: #0074cc;
  display: ${(props) => props.isClicked ? 'none' : 'flex'};
  &:hover {
    color: #50b3ff;
    cursor: pointer;
  }
`;

const MoreRelatedTagsContainer = styled.div`
  display: ${(props) => props.isClicked ? 'flex' : 'none'};
  flex-direction: column;
`

export default function RightSidebar() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Container>
      <BlogContainer>
        <ListHead radius={"5px 5px 0 0"} borderWidth={"0 0 1px 0"}>
          The Overflow Blog
        </ListHead>
        <ListItem>
          <ListIcon>
            <img src={PencilIcon} alt="pencil" />
          </ListIcon>
          <ListText>
            Let's Talk about our favorite terminal tools (EP.521)
          </ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img src={PencilIcon} alt="pencil" />
          </ListIcon>
          <ListText>
            Best practices to increase the speed for Next.js apps
          </ListText>
        </ListItem>
        <ListHead borderWidth={"1px 0 1px 0"}>Featured on Meta</ListHead>
        <ListItem>
          <ListIcon>
            <img src={Comment} alt="Comment"></img>
          </ListIcon>
          <ListText>Navigation and UI research starting soon</ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img src={LogoGraysm} alt="LogoGray"></img>
          </ListIcon>
          <ListText>
            Best practices to increase the speed for Next.js apps
          </ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img src={LogoGraysm} alt="LogoGray"></img>
          </ListIcon>
          <ListText>
            2022 Community Moderator Election Results - now with two more mods!
          </ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img src={LogoGraysm} alt="LogoGray"></img>
          </ListIcon>
          <ListText>Temporary policy: ChatGPT is banned</ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img src={LogoGraysm} alt="LogoGray"></img>
          </ListIcon>
          <ListText>I'm standing down as a moderator</ListText>
        </ListItem>
        <ListItem radius={"0 0 5px 5px"}>
          <ListIcon>
            <img src={LogoGraysm} alt="LogoGray"></img>
          </ListIcon>
          <ListText>
            Proposing a Community-Specific Closure Reason for non-English
            content
          </ListText>
        </ListItem>
      </BlogContainer>
      <RelatedTagsContainer>
        <RelateTagsHead>Related Tags</RelateTagsHead>
        <TagContainer>
          <Tag>Javascript</Tag>
          <TagCount>x 2600</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>Java</Tag>
          <TagCount>x 3003</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>CSS</Tag>
          <TagCount>x 30</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>Python</Tag>
          <TagCount>x 1008</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>C#</Tag>
          <TagCount>x 3003</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>C++</Tag>
          <TagCount>x 540</TagCount>
        </TagContainer>
        <TagLoader isClicked={isClicked} onClick={() => {setIsClicked(true)}}>more related tags</TagLoader>
        <MoreRelatedTagsContainer isClicked={isClicked}>
        <TagContainer>
        <Tag>Haksel</Tag>
          <TagCount>x 3002</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>Macdonalds</Tag>
          <TagCount>x 3223</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>BurgerKing</Tag>
          <TagCount>x 1643</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>Lotteria</Tag>
          <TagCount>x 363</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>ShakeShack</Tag>
          <TagCount>x 290</TagCount>
        </TagContainer>
        </MoreRelatedTagsContainer>  
      </RelatedTagsContainer>
    </Container>
  );
}
