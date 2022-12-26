import Header from "../Components/Header/Header"
import LeftNav from "../Components/LeftNav/LeftNav"
import styled from "styled-components/macro"
import User from "../Components/User/User"
import Footer from "../Components/Footer/Footer"
import BREAKPOINT from "../breakpoint"
import SearchBarIcon from "../icons/Search.svg";



const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
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
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(187, 191, 195);
  border-radius: 3px;
  width: max-content;
  height: 35px;
  padding-left: 1%;
  box-sizing: border-box;

  &:focus-within{
    box-shadow: 0 0 0 4px rgba(144, 203, 255, 0.4);
    border: 1px solid rgba(0, 103, 194, 0.4);
  }
`

const SearchBarInput = styled.input`
  all: unset;
  padding-left: 5px;
  font-size: 12px;

  &::placeholder {
    color : #d2d2d2;
  }
`


const MainbarUsersContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 50px;
  column-gap: 20px;
  margin: 0;
  margin-top: 50px;
  list-style: none;
  padding: 0;
  width: 100%;
  justify-content: space-between;
`


export default function Tags() {

  return (
    <>
    <Header/>
    <Container>
      <LeftNav/>
      <MainbarContainer>
        <MainbarTitleContainer>
          <MainbarTitle>Users</MainbarTitle>
          <SearchBar>
            <img src={SearchBarIcon} alt="icon"/>
            <SearchBarInput placeholder="Filter by users"/>
          </SearchBar>
        </MainbarTitleContainer>
        <MainbarUsersContainer>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
        </MainbarUsersContainer>
      </MainbarContainer>
    </Container>
    <Footer/>
    </>
  )
}
