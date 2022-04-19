import React from "react";
import Axios from 'axios';
import { useEffect, useState} from 'react';
import styled from "styled-components";
import "./Board.css"
function MainBoard() {
    const [viewContent , setViewContent] = useState([]);
    const [value, setValue] = useState("");

    useEffect(()=>{
      Axios.get('http://localhost:5001/api/mainboard')
      .then((response)=>{setViewContent(response.data);
        console.log(response.data[0])})
        .catch(err=>console.log(err))
    },[])
    
    const onClicks = (e) => {
        const clickId = e.target.id
        setValue(clickId);
        console.log(clickId);
        const test = {
            clickId
        }
    
        fetch("http://localhost:5001/api/mainboard", {
            method : "post",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(test)
        })
        console.log(test)
        // setBoard("read");
      }
    
return(
        <>
            <div className="App">
                <h1>게시판</h1> 
                <div className='movie-container'>
                    {viewContent.map(element =>
                        <div className="title">
                            <table className="tablecis">
                                <thead>
                                    <tr>
                                        <th className="ths">작성자 : {element.idx}</th>
                                        <th className="ths">제목 :  &nbsp;
                                            <a id={element.idx} href={`/boardpage/${element.idx}`} onClick={onClicks}>
                                            {element.title}
                                            </a>
                                        </th>
                                        <th className="ths">지역 : {element.addr}</th>
                                        <th className="ths">조회수 : {element.page_num}</th>
                                    </tr>
                                    </thead>
                                </table> 
                        </div>
                    ).reverse()}
                </div>
            </div>
            <a href="./board">
                <Button2>
                    글 쓰기
                </Button2>
            </a>
        </>
    )
}

export default MainBoard;

const Button2 = styled.button`
  width: 140px;
  border-radius: 5px;
  border: solid 1px #ffdcc5;
  box-sizing: border-box;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 7px;
  height: 40px;
  margin: 0px 5px;
  background-color: #ffffff;
  color: #666666;
`;