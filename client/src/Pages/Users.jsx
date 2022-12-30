import Header from "../Components/Header/Header"
import LeftNav from "../Components/LeftNav/LeftNav"
import styled from "styled-components/macro"
import User from "../Components/User/User"
import Footer from "../Components/Footer/Footer"
import BREAKPOINT from "../breakpoint"
import SearchBarIcon from "../icons/Search.svg";
import Pagination from "../Components/Pagination/Pagination"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

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

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 300px;
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

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTAGSTHREE}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-top: 30px;
  }
`
const PaginationContainer = styled.div`
  align-self: flex-end;
`

export default function Tags() {

  const [usersData, setUsersData] = useState('');
  const [pageInfo, setPageInfo] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  
  const fetchUsers = () => {

    if(!!page) {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}users?page=${page}`);
    } else {
      console.log('with query', page);
      return axios.get(`${process.env.REACT_APP_SERVER_URI}users`);
    }
  }

  useEffect(() => {
    window.scrollTo({left : 0, top: 0, behavior: "smooth"});
  }, [usersData]);

  const fetchUsersOnSuccess = (data) => {
    setUsersData(data.data.data);
    setPageInfo(data.data.pageInfo);
  }


  const {isLoading, refetch} = useQuery({queryKey: ['fetchUsers', page], queryFn: fetchUsers, keepPreviousData: true, onSuccess: fetchUsersOnSuccess});


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
            <SearchBarInput 
            placeholder="Filter by users" 
            />
          </SearchBar>
        </MainbarTitleContainer>
        <MainbarUsersContainer>
          {isLoading 
          ? <div>loading ...</div>
          : usersData && usersData.map((user) => {
            return <User data={user} key={user.memberId}/>
          })}
        </MainbarUsersContainer>
        <PaginationContainer>
          <Pagination pageinfo={pageInfo} setPage={setSearchParams} refetch={refetch}/>
        </PaginationContainer>
      </MainbarContainer>
    </Container>
    <Footer/>
    </>
  )
}
