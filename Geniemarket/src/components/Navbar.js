import React from 'react';

const Navbar = () => {
    const onLogoutHandler  = () => {
        window.localStorage.clear("loginUser")
        window.location.replace("/")
    };

    if( window.localStorage.getItem("loginStatus") ) {
    return(
      
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">지니마켓</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mypage">MyPage</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" onClick={onLogoutHandler}>Logout</a>
        </li> 
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/mainboard">게시판</a>
        </li> 
         <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/map">지도</a>
        </li> 
         <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/chat">채팅</a>
        </li> 
         <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/goodsboard">매물 보기</a>
        </li> 
         <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/goodsupload">매물 업로드</a>
        </li> 
      </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  </div>
</nav>
    )} else {
      return (
        <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">지니마켓 메뉴 괜찮죠?</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav"></ul>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/Signup">Signup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/Signin">Signin</a>
           
            </li>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </div>
            </nav>
            </>
            );
    }
};

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>

export default Navbar;