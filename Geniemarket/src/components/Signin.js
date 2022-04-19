import React, { useState }  from "react";
import axios from 'axios';
import './sign.css'

function Signin() {
    const [signinid, setSigninid] = useState('');
    const [signinpassword, setSigninpassword] = useState('');

    const onSigninidHandler = (event) => {
        setSigninid(event.currentTarget.value)
    }
    const onSigninpasswordHandler = (event) => {
        setSigninpassword(event.currentTarget.value)
    }

    const onSigninSubmitHandler = (event) => {
        event.preventDefault();
        fetchsignin();
    }
    const fetchsignin = async() => {
        axios.post("http://localhost:5001/api/signin", {
            signinid: signinid,
            signinpassword: signinpassword,
        }).then((response) => { if(response.data.message) {
                alert("로그인 실패")
                window.location.replace("/signin")
            } else {
                window.localStorage.setItem("loginUserAddr", response.data.useraddress)
                window.localStorage.setItem("loginStatus", JSON.stringify({ status: "success" }))
                window.localStorage.setItem("loginUser", signinid)
                window.localStorage.setItem("loginNickname", response.data.usernickname)
                window.location.replace("/")
            }
        })
    };
    
    return(
        <>
            <h2>로그인</h2>
            <form onSubmit={onSigninSubmitHandler} className="formline" >
                <label className="labels">아이디 : </label>
                <input type="text" value={signinid || ''} onChange={onSigninidHandler} placeholder="아이디를 입력하세요" className="inputs"/>
                <br />
                <label className="labels">비밀번호 : </label>
                <input type="password" value={signinpassword || ''} onChange={onSigninpasswordHandler} placeholder="비밀번호를 입력하세요" className="inputs"/>
                <br />
                <button type="submit" className="buttons">로그인</button>
            </form>
        </>
    );
};

export default Signin;