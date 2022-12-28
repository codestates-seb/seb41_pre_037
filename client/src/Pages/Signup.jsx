import styled from "styled-components/macro"
import BREAKPOINT from "../breakpoint"
import Google from '../icons/Google.png'

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

const Background = styled.div`
  background-color: #f6f6f6;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto auto;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 400px;
    flex-direction: column;
    align-items: center;
    height: max-content;
  }
`


const SignupDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
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
  font-weight: 500;
  font-size: x-large;
  display: none;
  text-align: center;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: flex;
    font-size: 21px;
    height: 50px;
    text-align: center;
    margin: 0 10px 30px  10px;
  }
`

const SignupDetail = styled.p`
  
`
const SignupDetailContent = styled.div`
  display: flex;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`

const SignupIcon = styled.div`
  margin-right: 10px;
  color: 	#0a95ff;
  padding-top: 10px;
`

const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  width: max-content;
` 

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #e4e4e4;
  width: 320px;
  height: max-content;
  background-color: white;
  box-shadow: 0 0 5px 5px #e4e4e4;
  margin-left: 25px;
  padding-top: 40px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    margin-left: 0;
  }
`
const SignupInputContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
  height: max-content;
  display: flex;
  flex-direction: column;
`

const SignupLabel = styled.label`
  font-weight: 600;
`

const SignupInputBox = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid #bababa;
  border-radius: 4px;
  display: flex;

  &.focused {
    border: ${props => props.isValid ? '1px solid #bababa' : '1px solid #b90101;'};
  }
`

const SignupInput = styled.input`
  width: 100%;
  padding-left: 10px;
  border: none;
  border-radius: 4px;
  
  &:focus-within {
    outline: none;
  }
`

const PasswordValidation = styled.p`
  width: 80%;
  font-size: small;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  color: gray;
`
const SignupButton = styled.button`
  margin-top: auto;
  width: 80%;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;

  &:hover {
    cursor: pointer;
    background-color: #236ba2;
    color: #c0c0c0;
    border-color: #c0c0c0;
  }
`

const SignupAgreeInfo = styled.p`
  width: 80%;
  color: gray;
  font-size: small;
  margin-bottom: 50px;
`

const Linker = styled.a`
  color: #0a95ff;

  &:hover {
    cursor: pointer;
  }
`

const SocialLoginContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  box-sizing: border-box;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    margin-left: 0;
  }
`


const GoogleLogin = styled.a`
  width: 310px;
  margin-bottom: 10px;
  height: max-content;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`
const SocialLoginIcon = styled.img`
  width: 30px; 
  height: 30px; 
  margin: 0;
`

const SocialLoginText = styled.p`
  margin: 0;
  font-size: 15px;
  text-align: center;
  padding-top: 5px;
`

const SignupValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-top: 5px;
  color: #b90101;
`

const SignupWarningIconContainer = styled.div`
  display: flex;
  padding-top: 5px;
  margin-right: 5px;
`

export default function Signup() {
  const navigate = useNavigate();
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

  const {mutate:createUser} = useMutation({mutationKey:['postSignupData'], mutationFn:postSignupData});

  // 실시간 유효성 검사
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

  const signupClickHandler = () => {
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

  return (
    <Background>
      <Container>
        <SignupDetailContainer>
          <SignupDetailHead>Join the Stack Overflow Community</SignupDetailHead>
          <SignupDetailHeadMobile>Create your Stack Overflow account. It’s free and only takes a minute.</SignupDetailHeadMobile>
          <SignupDetailContent>
            <SignupIcon>
              <svg width="26" height="26" fill="#0a95ff"><path opacity=".5" d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"></path><path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path></svg>
            </SignupIcon>
            <SignupDetail>
              Get Unstuck - ask a question
            </SignupDetail>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path><path opacity=".5" d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"></path></svg>
            </SignupIcon>
            <SignupDetail>
            Unlock new privileges like voting and commenting
            </SignupDetail>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path><path opacity=".5" d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"></path></svg>
            </SignupIcon>
            <SignupDetail>
              Save your favorite tags, filters, and jobs
            </SignupDetail>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path></svg>
            </SignupIcon>
            <SignupDetail>
              Earn Reputation and badges
            </SignupDetail>
          </SignupDetailContent>
        </SignupDetailContainer>
        <SignupFormContainer>
          <SocialLoginContainer>
            <GoogleLogin href={`/oauth2/authorization/google`}>
              <SocialLoginIcon src={Google}/>
              <SocialLoginText>Sign up with Google</SocialLoginText>
              </GoogleLogin>
          </SocialLoginContainer>

          <SignupForm>
            <SignupInputContainer>
              <SignupLabel>Display Name</SignupLabel>
              <SignupInputBox className={displayNameOnFocus && !displayNameValid &&'focused'} isValid={displayNameValid && displayNameOnFocus}>
                <SignupInput value={displayName} onChange={e => {setDisplayName(e.target.value)}} onFocus={() => {setDisplayNameOnFocus(true)}}/>
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
              <SignupInputBox className={userEmailOnFocus && !userEmailValid &&'focused'} isValid={userEmailValid && userEmailOnFocus}>
                <SignupInput type="email" value={userEmail} onChange={e => {setUserEmail(e.target.value)}} onFocus={() => {setUserEmailOnFocus(true)}}/>
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
              <SignupInputBox className={userPasswordOnFocus && !(passwordLegnthValid && passwordRegexValid) &&'focused'} isValid={userPasswordOnFocus && (passwordLegnthValid && passwordRegexValid)}>
                <SignupInput type="password" value={userPassword} onChange={e => {setUserPassword(e.target.value)}} onFocus={() => {setUserPasswordeOnFocus(true)}}/>
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
            <SignupButton onClick={signupClickHandler}>Sign up</SignupButton>
            <SignupAgreeInfo>By clicking “Sign up”, you agree to our <Linker>terms of service</Linker>, <Linker>privacy policy</Linker> and <Linker>cookie policy</Linker></SignupAgreeInfo>
          </SignupForm>
          <p css={`font-size: small;`}>Already have a account? <Linker onClick={() => navigate('/login')}>Log in</Linker></p>
        </SignupFormContainer>
      </Container>
    </Background>
  )
}
