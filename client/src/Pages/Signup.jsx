// 페이지, 리액트 컴포넌트, 정적파일 
import Header from "../Components/Header/Header"
import Google from '../icons/Google.png'

//로컬 모듈
import BREAKPOINT from "../breakpoint"

// 라이브러리 및 라이브러리 메소드
import { useState, useEffect } from "react"
import styled from "styled-components/macro"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const Background = styled.div`
  align-items: center;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  height: max-content;
  justify-content: center;
  margin: auto auto;
  width: 100%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    align-items: center;
    flex-direction: column;
    height: max-content;
    width: 400px;
  }
`

const SignupDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    height: 60px;
  }
`

const SignupDetailHead = styled.div`
  font-weight: 500;
  font-size: 28px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`

const SignupDetailHeadMobile = styled.div`
  display: none;
  font-weight: 500;
  font-size: x-large;
  text-align: center;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: flex;
    font-size: 21px;
    height: 50px;
    margin: 0 10px 30px  10px;
    text-align: center;
  }
`

const SignupDetailContent = styled.div`
  display: flex;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`

const SignupIcon = styled.div`
  color: 	#0a95ff;
  margin-right: 10px;
  padding-top: 10px;
`

const SignupFormContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  width: max-content;
` 

const SocialLoginContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  margin-left: 25px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    margin-left: 0;
  }
`

const SocialLoginIcon = styled.img`
  height: 30px; 
  margin: 0;
  width: 30px; 
`

const SocialLoginText = styled.p`
  font-size: 15px;
  margin: 0;
  padding-top: 5px;
  text-align: center;
`

const GoogleLogin = styled.a`
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  height: max-content;
  justify-content: center;
  margin-bottom: 10px;
  padding: 3px;
  width: 310px;

  &:hover {
    background-color: #f0f0f0;
  }
`

const SignupForm = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  box-shadow: 0 0 5px 5px #e4e4e4;
  display: flex;
  flex-direction: column;
  height: max-content;
  margin-left: 25px;
  padding-top: 40px;
  width: 320px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    margin-left: 0;
  }
`

const SignupInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
`

const SignupLabel = styled.label`
  font-weight: 600;
`

const SignupInputBox = styled.div`
  border: 1px solid #bababa;
  border-radius: 4px;
  display: flex;
  height: 30px;
  width: 100%;

  &.focused {
    border: ${props => props.isValid ? '1px solid #bababa' : '1px solid #b90101;'};
    
  }
  
  &:focus-within{
    border: 1px solid rgba(0, 103, 194, 0.4);
    box-shadow: 0 0 0 4px rgba(144, 203, 255, 0.4);
  }
`

const SignupInput = styled.input`
  border: none;
  border-radius: 4px;
  padding-left: 10px;
  width: 100%;
  
  &:focus-within {
    outline: none;
  }
`

const SignupWarningIconContainer = styled.div`
  display: flex;
  padding-top: 5px;
  margin-right: 5px;
`

const SignupValidationContainer = styled.div`
  color: #b90101;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-top: 5px;
`

const PasswordValidation = styled.p`
  color: gray;
  font-size: small;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 80%;
`

const SignupButton = styled.button`
  background-color: #0a95ff;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
  color: white;
  height: 35px;
  margin-top: auto;
  width: 80%;

  &:hover {
    background-color: #236ba2;
    border-color: #c0c0c0;
    color: #c0c0c0;
    cursor: pointer;
  }
`

const SignupAgreeInfo = styled.p`
  color: gray;
  font-size: small;
  margin-bottom: 50px;
  width: 80%;
`

const Linker = styled.a`
  color: #0a95ff;

  &:hover {
    cursor: pointer;
  }
`


// Main Component
export default function Signup() {
  // React States
  const [displayName, setDisplayName] = useState('');
  const [displayNameValid, setDisplayNameValid] = useState(false);
  const [displayNameOnFocus, setDisplayNameOnFocus] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userEmailValid, setUserEmailValid] = useState(false);
  const [userEmailOnFocus, setUserEmailOnFocus] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordOnFocus, setUserPasswordeOnFocus] = useState(false);
  const [passwordLegnthValid, setPasswordLengthValid] = useState(false);
  const [passwordRegexValid, setPasswordRegexValid] = useState(false);
  
  // Other Hooks
  const navigate = useNavigate();
  
  // UseEffect (실시간 유효성 검사)
  useEffect(() => {
    if(displayName.length > 0 ) {
      setDisplayNameValid(true);
    } else {
      setDisplayNameValid(false);
    }
  }, [displayName]);

  useEffect(() => {
    if(userEmail.length > 0 && /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(userEmail)) {
      setUserEmailValid(true);
    } else {
      setUserEmailValid(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if(userPassword.length > 8 && userPassword.length < 20) {
      setPasswordLengthValid(true);
    } else {
      setPasswordLengthValid(false);
    }

    if(/^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(userPassword)) {
      setPasswordRegexValid(true);
    } else {
      setPasswordRegexValid(false);
    }
  }, [userPassword]);

  // Ajax function (Axios)
  const postSignupData = () => {
    const data = {
      username: displayName,
      email: userEmail,
      password: userPassword,
    }

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }

    return axios.post(`${process.env.REACT_APP_SERVER_URI}users/signup`, data, headers);
  }

  // Ajax OnSuccess
  const createUserOnSuccess = () => {
    window.alert('Successfully created');
    navigate('/login');
  }

  // Ajax Tanstack Query
  const {mutate:createUser} = useMutation({mutationKey:['postSignupData'], mutationFn:postSignupData, onSuccess: createUserOnSuccess});

  // Event Handlers
  const inputOnChangeHandler = (e, setState) => {
    setState(e.target.value);
  }

  const inputOnFocusHandler = (setState) => {
    setState(true);
  }

  const signupOnClickHandler = () => {
    if(displayNameValid && userEmailValid && passwordLegnthValid && passwordRegexValid) {
      try{
        createUser();
      } catch {
        navigate('/error');
      }
    } else {
      window.alert('please fill in the whole forms');
    }
  }

  const linkerOnClickHandler = () => {
    navigate('/login');
  }


  return (
    <Background>
      <Header/>
      <Container>
        <SignupDetailContainer>
          <SignupDetailHead>Join the Stack Overflow Community</SignupDetailHead>
          <SignupDetailHeadMobile>Create your Stack Overflow account. It’s free and only takes a minute.</SignupDetailHeadMobile>
          <SignupDetailContent>
            <SignupIcon>
              <svg width="26" height="26" fill="#0a95ff"><path opacity=".5" d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"></path><path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path></svg>
            </SignupIcon>
            <p>Get Unstuck - ask a question</p>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path><path opacity=".5" d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"></path></svg>
            </SignupIcon>
            <p>Unlock new privileges like voting and commenting</p>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path><path opacity=".5" d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"></path></svg>
            </SignupIcon>
            <p>Save your favorite tags, filters, and jobs</p>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path></svg>
            </SignupIcon>
            <p>Earn Reputation and badges</p>
          </SignupDetailContent>
        </SignupDetailContainer>
        <SignupFormContainer>
          <SocialLoginContainer>
            <GoogleLogin href={`${process.env.REACT_APP_SERVER_URI}oauth2/authorization/google`}>
              <SocialLoginIcon src={Google}/>
              <SocialLoginText>Sign up with Google</SocialLoginText>
              </GoogleLogin>
          </SocialLoginContainer>

          <SignupForm>
            <SignupInputContainer>
              <SignupLabel>Display Name</SignupLabel>
              <SignupInputBox className={displayNameOnFocus && !displayNameValid &&'focused'} isValid={displayNameValid && displayNameOnFocus}>
                <SignupInput 
                onChange={e => {inputOnChangeHandler(e, setDisplayName)}} 
                onFocus={()=>{inputOnFocusHandler(setDisplayNameOnFocus)}} 
                value={displayName}/>
                {
                !displayNameValid && displayNameOnFocus &&
                <SignupWarningIconContainer>
                  <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#b90101" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
                </SignupWarningIconContainer>
                } 
              </SignupInputBox>
              {
                !displayNameValid && displayNameOnFocus &&
                <SignupValidationContainer>
                  Display name cannot be empty.
                </SignupValidationContainer>
              }
            </SignupInputContainer>
            <SignupInputContainer>
              <SignupLabel>Email</SignupLabel>
              <SignupInputBox 
              className={userEmailOnFocus && !userEmailValid &&'focused'} 
              isValid={userEmailValid && userEmailOnFocus}>
                <SignupInput 
                type="email" 
                value={userEmail} 
                onChange={e => inputOnChangeHandler(e, setUserEmail)} 
                onFocus={() => {inputOnFocusHandler(setUserEmailOnFocus)}}/>
                {
                !userEmailValid && userEmailOnFocus &&
                <SignupWarningIconContainer>
                  <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#b90101" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
                </SignupWarningIconContainer>
                } 
              </SignupInputBox>
              {
                !userEmailValid && userEmailOnFocus &&
                <SignupValidationContainer>
                Email must have valid email form.
              </SignupValidationContainer>
              }
            </SignupInputContainer>
            <SignupInputContainer>
              <SignupLabel>Password</SignupLabel>
              <SignupInputBox 
              className={userPasswordOnFocus && !(passwordLegnthValid && passwordRegexValid) &&'focused'} 
              isValid={userPasswordOnFocus && (passwordLegnthValid && passwordRegexValid)}>
                <SignupInput 
                type="password" 
                value={userPassword} 
                onChange={e => {inputOnChangeHandler(e, setUserPassword)}} 
                onFocus={() => {inputOnFocusHandler(setUserPasswordeOnFocus)}}/>
                {
                !(passwordLegnthValid && passwordRegexValid) && userPasswordOnFocus && 
                <SignupWarningIconContainer>
                  <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#b90101" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
                </SignupWarningIconContainer>
                }
                </SignupInputBox>
                {
                  !(passwordLegnthValid && passwordRegexValid) && userPasswordOnFocus &&
                  <SignupValidationContainer>
                    Password must follow valid rules.
                    <ul css={`padding: 0; padding-left: 20px;`}>
                      {!passwordLegnthValid && userPasswordOnFocus && <li css={`margin-top: 5px;`}>Password must be 8 ~ 20 characters.</li>}
                      {!passwordRegexValid && userPasswordOnFocus && <li css={`margin-top: 5px;`}>Password must have one or more number and character</li>}
                      {!passwordRegexValid && userPasswordOnFocus && <li css={`margin-top: 5px;`}>Password cannot use special characters other than !@#$%^&*</li>}
                    </ul>
                  </SignupValidationContainer>
                } 
            </SignupInputContainer>
            <PasswordValidation>Passwords must contain at least eight characters, including at least 1 letter and 1 number.</PasswordValidation>
            <SignupButton onClick={signupOnClickHandler}>Sign up</SignupButton>
            <SignupAgreeInfo>By clicking “Sign up”, you agree to our <Linker>terms of service</Linker>, <Linker>privacy policy</Linker> and <Linker>cookie policy</Linker></SignupAgreeInfo>
          </SignupForm>
          <p css={`font-size: small;`}>Already have a account? <Linker onClick={linkerOnClickHandler}>Log in</Linker></p>
        </SignupFormContainer>
      </Container>
    </Background>
  )
}
