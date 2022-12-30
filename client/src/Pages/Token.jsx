import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsLoginStore } from "../store/loginstore";

export default function Token() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    if(accessToken) {
      sessionStorage.setItem('accesstoken', accessToken);
      setIsLogin(true);
      navigate('/');
    }
  }, []);



  return (
    <>
    </>
  )
}
