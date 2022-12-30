import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsLoginStore } from "../store/loginstore";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Token() {
  const [searchParams] = useSearchParams();
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    if(accessToken) {
      sessionStorage.setItem('accesstoken', accessToken);
      // user/login 로 
      setIsLogin(true);
      navigate('/');
    }
  }, []);

  const fetchUserInfo = () => {
    const accessToken = sessionStorage.getItem('accesstoken');
    const headers = {
      'AUTHORIZATION' : `Bearer ${accessToken}`
    }
    return axios.get(`${process.env.REACT_APP_SERVER_URI}users/token`, {headers});
  }


  useQuery({queryKey:['getUserInfo'], queryFn:fetchUserInfo, enabled: isLogin, onSuccess:(data) => {console.log(data)}})

  return (
    <>
    </>
  )
}
