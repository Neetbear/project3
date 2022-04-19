import React, { useState, useEffect } from "react";
import Axios from "axios";
import './GoodsBoard.css';
import { BsHeart } from 'react-icons/bs';
import { IoChatbubblesOutline } from 'react-icons/io5';


function GoodsBoard() {
  const [goodsContent, setGoodsContent] = useState([]);
  const [value, setValue] = useState("");
  const addr = window.localStorage.getItem("loginUserAddr").split(' ');

    useEffect(()=>{
      Axios.get('http://localhost:5001/api/goodsboard')
      .then((response) => {setGoodsContent(response.data);
      console.log(response.data[0].goods_img)})
      .catch(err=>console.log(err))
    }, []);

  const onClick = (e) => {
    const clickId = e.target.id
    setValue(clickId);
    console.log(clickId);
    const test = {
        clickId
    }

    fetch("http://localhost:5001/api/goodsboard", {
        method : "put",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(test)
    })
    console.log(test)
  }

  return (
    <div className="goodsBoardTemplate">
      <div className="goodsBoardHead">우리동네 중고거래 매물</div>
      <div className="goodsBoardAreaSelect">
        {window.localStorage.getItem("loginUserAddr")}
      </div>
      <div className="goodsBoardDisplay" >
        {goodsContent.map(element =>
          <div className="goodsBoardWrap_Goods">
            <div className="goodsBoardImg">
              {console.log(element.goods_addr)}
            <a href={`/goodspage/${element.goodsnumber}`}><img id={element.goodsnumber} src={element.goods_img.split("#")[0]} className="goodsMainImg" onClick={onClick}/></a>
            </div>
            <div className="goodsBoardContents">
              <div className="goodsBoardName"><a id={element.goodsnumber} href={`/goodspage/${element.goodsnumber}`} onClick={onClick}>{element.goods_title}</a></div>
              <div className="goodsBoardPrice"><a id={element.goodsnumber} href={`/goodspage/${element.goodsnumber}`} onClick={onClick}>{element.goods_price}</a></div>
              <div className="goodsBoardCity">{element.goods_addr}</div>
              
              <div className="goodsBoard">
                
                <div><BsHeart />{element.goods_hit}</div>
                <div><IoChatbubblesOutline /></div>
              </div>
            </div>
          </div>
        ).reverse()}
      </div>
    </div>
  )
}

export default GoodsBoard;




