import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useIsLoginStore } from "./store/loginstore";

const AskQuestions = React.lazy(() => import('./Pages/AskQuestions'));
const Login = React.lazy(() => import('./Pages/Login'));
const Main = React.lazy(() => import('./Pages/Main'));
const Post = React.lazy(() => import('./Pages/Post/Post'));
const ProfileDefault = React.lazy(() => import('./Pages/ProfileDefault'));
const Signup = React.lazy(() => import('./Pages/Signup'));
const Tags = React.lazy(() => import('./Pages/Tags'));
const Users = React.lazy(() => import('./Pages/Users'));
const MainSearch = React.lazy(() => import('./Pages/MainSearch'));
const Token = React.lazy(() => import('./Pages/Token'));
const NotFound = React.lazy(() => import('./Pages/NotFound'));


function App() {
  const { setIsLogin } = useIsLoginStore((state) => state);

  useEffect(() => {
    if (sessionStorage.getItem("accesstoken")) {
      return setIsLogin(true);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/search" element={<MainSearch />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/post">
          <Route path=":id/:title" element={<Post />}></Route>
        </Route>
        <Route path="/askquestions" element={<AskQuestions />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/profile">
          <Route path=":id/:username" element={<ProfileDefault />}></Route>
        </Route>
        <Route path="/token" element={<Token />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
