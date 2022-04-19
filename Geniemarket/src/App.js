import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./components/Layout";
import NoPage from "./components/Nopage";
import Home from "./components/Home";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Board from "./board/Board"
import MainBoard from "./board/MainBoard";
import MapContainer from './components/MapContainer';
import Mypage from './components/Mypage';
import Chat from './components/Chat';
import BoardPage from './board/BoardPage';
import GoodsBoard from './pages/GoodsBoard/GoodsBoard';
import GoodsPage from './pages/GoodsPage/GoodsPage';
import GoodsUpload from './pages/GoodsUpload/GoodsUpload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="map" element={<MapContainer />} />
            <Route path="*" element={<NoPage />} />
            <Route path="mainboard" element={<MainBoard />} />
            <Route path="/boardpage/:idx" element={<BoardPage />} />
            <Route path="board" element={<Board />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="goodsboard" element={<GoodsBoard />} />
            <Route path="goodspage/:goodsnumber" element={<GoodsPage />} />
            <Route path="goodsupload" element={<GoodsUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
