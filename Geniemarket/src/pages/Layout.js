import React from "react";
import './Layout.css'
import { Outlet, Link } from "react-router-dom";
import Home from "./Home";

const Layout = () => {
  return (
    <>
      <nav className="layoutNav">
        <div className="layoutNavLeft">
          <div><Link to="/">지니마켓</Link></div>
          <div>
            <input type="search" />
          </div>
        </div>
        <div className="layoutNavRight">
          <div>다운로드</div>
          <div>회원가입</div>
        </div>
      </nav>
      <div className="main">
      </div>
      
      <Outlet />
    </>
  )
}

export default Layout;