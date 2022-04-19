import React, { useCallback, useEffect, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import classnames from "classnames";
import axios from 'axios';

const socket = io.connect("http://localhost:5001");

function Chat() {
  // const username = "user"
  // socket.emit('room',username);

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth()+1;
  let day = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  let nick = window.localStorage.getItem('loginNickname')

  const [nickname, setNickname] = useState(nick)
  
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState([]);
  
  const chatInput = document.querySelector('.message')

  const fetchchat = async() => {
    const result = await axios.get("http://localhost:5001/api/chat").then(res => res.data)
    const chatmessages = document.querySelector('#chatmessages')
    let nickname = document.querySelector('#usernick').value
    for(let i = 0; i < result.length; i++) {
      if(result[i].name === nickname) {
        let div = document.createElement('div')

        div.idx = result[i].idx
        const dbChat = `<div className="Chat" style="display: flex; justify-content: start; align-items: center; width:100%; height:5%; border:1px solid black;">
        <div className="chat-name" style="flex: 1;">${result[i].name}</div>
        <div className="chat-message" style="flex: 1;">${result[i].msg}</div>
        <div className="chat-time" style="flex: 1; font-size: 0.7rem;">${result[i].time}</div>
        </div>
        `
        div.innerHTML = dbChat
        chatmessages.appendChild(div)
        }
      }
};

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    fetchchat();
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));

      console.log(message);
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  const buttonHandler = useCallback((e) => {
    // 11월에 열때는 "0" 지우고 열기
    const timelog = year + "-" + "0" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    chatInput.value = ""
    socket.emit("send message", { name: nickname, message: chat.message, time : timelog}); 
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);

  const onKeyPress = (e) => {
    if(e.key==='Enter'){
      buttonHandler();
    }
  }

  const changeMessage = useCallback(
    (e) => {
      setChat({ name: chat.name, message: e.target.value, time:e.target.value });
    },
    [chat]
  );

  const changeName = useCallback(
    (e) => {
      setChat({ name: e.target.value, message: chat.message, time: chat.time });
    },
    [chat]
  );
  
  const onSubmit = () => {
    const post ={
      pname: nickname,
      pmessage: setChat.message,
      ptime : setChat.time
    };

    console.log(post);

    fetch("http://localhost:3000/api/signup", {
      method : "post",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(post)
    })
    .then((res)=> res.json())
    .then((json)=>{
      console.log(json);
      if (json) {
        alert("대화가 저장되었습니다!")
      }
    })
  }

  return (
    <div className="App">
      <div className="Box">
        <div className="ChatBox" id="chatmessages">
          {chatArr.map((ele) => (
            <>
              <div className={classnames('Chat', {RChat : nickname !== ele.name})}>
                <div className="chat-name">{nickname}</div>
                <div className="chat-message">{ele.message}</div>
                <div className="chat-time">{ele.time}</div>
              </div>
            </>
          ))}
          
        </div>
        <div className="InputBox">
          <input placeholder="이름" onChange={changeName} value={nick} id="usernick"></input>
          <input placeholder="내용" onChange={changeMessage} onKeyPress={onKeyPress} className="message"></input>
          <button onClick={buttonHandler} onKeyPress={onKeyPress} onSubmit={onSubmit} className="sendButton">등록</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;