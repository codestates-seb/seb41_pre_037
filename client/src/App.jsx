import "./App.css";
import { Routes, Route } from "react-router-dom";
import AskQuestions from "./Pages/AskQuestions";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Post from "./Pages/Post/Post";
import ProfileDefault from "./Pages/ProfileDefault";
// import ProfileEdit from "./Pages/ProfileEdit";
// import ProfileDelete from "./Pages/ProfileDelete";
import Signup from "./Pages/Signup";
import Tags from "./Pages/Tags";
import Users from "./Pages/Users";
import axios from "axios";
import MainSearch from "./Pages/MainSearch";
import { useEffect } from "react";
import { useIsLoginStore } from "./store/loginstore";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URI;
// axios.defaults.withCredentials = true;

function App() {
  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);

  useEffect(() => {
    if (sessionStorage.getItem("accesstoken")) {
      return setIsLogin(true);
    }
  }, []);

  return (
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
    </Routes>
  );
}

export default App;
