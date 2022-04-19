//수정 넣기 전

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import './GoodsPage.css'
import { IoShareOutline } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';
import { BiSmile } from 'react-icons/bi';
import styled from "styled-components";

const Button3 = styled.button`
  width: 200px;
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
  cursor: pointer
`;



function GoodsPage() {
  const [goodsPage, setGoodsPage] = useState([]);

  const params = useParams();
  console.log(params);

  useEffect(()=>{
    Axios.get(`http://localhost:5001/api/goodspage/${params.goodsnumber}`)
    .then((response)=>{setGoodsPage(response.data); console.log(response)})
    .catch(err=>console.log(err))
  }, []);
  // }, []);
    console.log(goodsPage)

  

  return(
    <div className="GoodsPgTemplate">
      {goodsPage.map(element =>
        <>
        <div className="GoodsPgNav">
          {/* <IoShareOutline /> */}
          {/* <IoMdMore /> */}
          {/* <div><a href="/goodspage/delete/:goodsnumber">삭제</a></div> */}
          <div className="GoodsPgEdit"><a href={`/goodsedit/${element.goodsnumber}`}>수정</a></div>
        </div>
        <div className="GoodsImages">
          <img src={element.goods_img.split("#")[0]} />
        </div>
        <div className="GoodsPgUserInfo">
          <div className="GoodsPgUserInfoLeft">
            <div className="GoodsPgUserImg" />
            <div className="GoddsPgUser">
              <div>이름</div>
              <div>{element.goods_addr}</div>
            </div>
          </div>
          <div className="GoodsPgUserInfoRight">
            <div className="GoodsPgUserTemp">
              <div>39.6&nbsp;</div>
              <div>&nbsp;<BiSmile /></div>
            </div>
            <div>매너온도</div>
          </div>
        </div>
        <div className="GoodsPgContent">
          <div>
            <select>
            <option>판매중</option>
            <option>예약중</option>
            <option>거래완료</option>
            </select>
          </div>
          <div><h1>{element.goods_title}</h1></div>
          <div><h3>{element.goods_price}</h3></div>
          <div><h6>생활용품</h6></div>
          <div className="GoodsPgContentDb">{element.goods_description}</div>
          <div className="GoodsPgContentBottom">
            <div>
              <div>채팅</div>
              <div>관심</div>
              <div>조회{element.goods_hit}</div>
            </div>
            <Button3
            onClick={() => {
              window.location.href="/chat"
            }}
          >
            채팅하기
          </Button3>
          </div>
        </div>
        {/* <div className="GoodsPgReport">
          이 게시글 신고하기
        </div>
        <div className="GoodsPgUsersGoods">
          <div className="GoodsPgUserGoodsUserid">
            <div>아이디 님의 판매 상품</div>
            <div>더보기</div>
          </div>
          <div>
            <div>사진</div>
            <div>제목</div>
            <div>가격</div>
          </div>
        </div> */}
        </>
      )}
    </div>
  )
}

export default GoodsPage;