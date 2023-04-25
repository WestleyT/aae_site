import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import SinglePost from "./pages/single_post/SinglePost";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Drafts from "./components/posts/Drafts";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import './App.css';

function App() {
  const {user} = useContext(Context);

  //refresh user's jwt everytime they make a request
  const axiosJwt = axios.create(); //seperate instance of axios so we don't run into errors when user first signs in
  axiosJwt.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    }
  )

  const refreshToken = async() => {
    try {
      const res = await axios.post("/refresh", {token: user.refreshToken});
      //we'd set the user and other stuff here
      return res.data;
    } catch(error) {
      console.log('error ', error);
    }
  }

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={user ? <Home /> : <Register />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/write/:postId" element={<Write />}></Route>
        <Route path="/drafts" element={<Drafts />}></Route>
        <Route path="/posts/:postId" element={<SinglePost />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
