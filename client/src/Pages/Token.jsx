import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsLoginStore } from "../store/loginstore";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//구글 로그인할 때도 세션 스토리지에 일반 로그인처럼 유저 정보 담기게 설정

export default function Token() {
  const [searchParams] = useSearchParams();
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      sessionStorage.setItem("accesstoken", accessToken);
      setIsLogin(true);
    }
  }, []);

  const fetchUserInfo = () => {
    const accessToken = sessionStorage.getItem("accesstoken");
    const headers = {
      AUTHORIZATION: `Bearer ${accessToken}`,
    };
    return axios.get(`${process.env.REACT_APP_SERVER_URI}users/token`, { headers });
  };

  useQuery({
    queryKey: ["getUserInfo"],
    queryFn: fetchUserInfo,
    enabled: isLogin,
    onSuccess: (data) => {
      sessionStorage.setItem("userInfoStorage", JSON.stringify(data.data.data));
      navigate("/");
    },
  });

  return <></>;
}
