import React from "react";
import Axios from 'axios';
import { useEffect, useState} from 'react';
import styled from "styled-components";
import { useParams,useNavigate } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import "./Board.css"

function BoardPage() {
    const [boardPage, setBoardPage] = useState([]);
    const params = useParams();
    console.log(params);
    
    useEffect(()=>{
      Axios.get(`http://localhost:5001/api/boardpage/${params.idx}`)
      .then((response)=>{setBoardPage(response.data); console.log(response)})
      .catch(err=>console.log(err))
    },[])
   
    const deleteClick = () => {
        Axios.post(`http://localhost:5001/api/boardpage/${params.idx}`, {
            idx: params.idx
        }).then(window.location.replace("/mainboard"))
    }; 

return(
    <> 
    <div>
        <h1 className="centers">게시판 내부</h1> 
        {boardPage.map(element =>
            <div  className="allsi">
                <div className="titsl">
                    제목 : {element.title}
                </div>
                <div className="line">
                </div>
                <div>
                    {ReactHtmlParser(element.content)}
                </div>
                
            </div>
            
      )}
        </div>
        <Button2 onClick={deleteClick}>
             DELETE
        </Button2>
</>
    )
}


export default BoardPage;

const Button2 = styled.button`
  width: 140px;
  border-radius: 5px;
  border: solid 1px #ffdcc5;
  box-sizing: border-box;
  text-decoration: none;
  vertical-align: middle;
  float: right;
  text-align: center;
  padding: 7px;
  height: 40px;
  margin: 0px 5px;
  margin-top: 5%;
  margin-right: 5%;
  background-color: #ffffff;
  color: #666666;
`;