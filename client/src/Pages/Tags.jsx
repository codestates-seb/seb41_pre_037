import Header from "../Components/Header/Header"
import LeftNav from "../Components/LeftNav/LeftNav"
import styled from "styled-components/macro"
import RightSidebar from "../Components/RightSidebar/RightSidebar"
import Tag from "../Components/Tag/Tag"
import Footer from "../Components/Footer/Footer"


const Container = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  max-width: 1260px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
`

const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 500px;
  margin: 0 20px;
  margin-bottom: 50px;
`

const MainbarTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`
const MainbarTitle = styled.h1`
  font-weight: 400;
  font-size: 28px;
`
const MainbarTitleDetail = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-size: 16px;
`

const MainbarTagsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 10px;
  column-gap: 10px;
  margin: 0;
  margin-top: 50px;
  list-style: none;
  padding: 0;
  width: 100%;
  justify-content: space-between;
`

const RightSidebarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  width: 20%;
  min-width: 300px;
`;

export default function Tags() {
  return (
    <>
    <Header/>
    <Container>
      <LeftNav/>
      <MainbarContainer>
        <MainbarTitleContainer>
          <MainbarTitle>Tags</MainbarTitle>
          <MainbarTitleDetail>A tag is a keyword or label that categorizes your question with other, similar questions. <br/>Using the right tags makes it easier for others to find and answer your question.</MainbarTitleDetail>
        </MainbarTitleContainer>
        <MainbarTagsContainer>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
          <Tag/>
        </MainbarTagsContainer>
      </MainbarContainer>
    </Container>
    <Footer/>
    </>
  )
}
