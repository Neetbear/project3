import React from "react";
import Button from "../elements/Button"
import Banner1 from "./Banner1";
import Navbar from "./Navbar";

function Home () {
    // let loginstate = window.localStorage.getItem("loginStatus").status;
    // let loginuser = window.localStorage.setItem("loginUser").user;
    // return (
    //     <div>
    //         <h1>Home</h1>
    //     </div>
    // );
    if ( window.localStorage.getItem("loginStatus") ) {
     
        return (
            <div>
               
                <p><b>{window.localStorage.getItem("loginUser")}님이 로그인 중입니다</b></p>
                <b>주소 : {window.localStorage.getItem("loginUserAddr")}</b>
                <Banner1 />
            </div>
        );
    } else {
      const liStyle = {
        display: 'inline-block'
    }
        return (
          
          <>
          
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">지니마켓</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav"></ul>
                <li class="nav-item">
                  <a class="nav-link active" style={liStyle} aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" style={liStyle} aria-current="page" href="/Signup">Signup</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" style={liStyle} aria-current="page" href="/Signin">Signin</a>
               
                </li>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                </div>
                </nav>
                <Banner1 />
                </>
        );
    };
};

export default Home;