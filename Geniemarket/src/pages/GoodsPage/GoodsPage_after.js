//edit 수정 버전

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import './GoodsPage.css'
import { IoShareOutline } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';
import { MdSettingsEthernet } from "react-icons/md";
import { GrStreetView } from "react-icons/gr";

function GoodsPage() {
  const [goodsPage, setGoodsPage] = useState("view");
  const [goodsPage, setGoodsPage] = useState(write);
  console.log("GoodsView: " + write);

  const params = useParams();
  console.log(params);

  useEffect(()=>{
    Axios.get(`http://localhost:5001/api/goodspage/${params.goodsnumber}`)
    .then((res)=> res.json())
    .then((json) => {
      for (let data of json) {
        if(data.goods_title == write.goods_title && data.goods_price == write.goods_price && data.goods_img == write.goods_img && data.goods_hit == write.goods_hit && data.goods_description == write.goods_description) {
          MdSettingsEthernet(data);
        }
      }
    })
    .catch(err=>console.log(err))
  }, []);
  // }, []);
    console.log(goodsPage)


  const onSubmitMain = () => {
    GrStreetView("main")
  }

  const onSubmitEdit = () => {
    GrStreetView("edit")
  }
  
  if(view === "view"){
    return(
      <div className="GoodsPgTemplate">
        {goodsPage.map(element =>
          <>
          <div className="GoodsPgNav">
            <IoShareOutline />
            <IoMdMore />
            {/* <div><a href="/goodspage/delete/:goodsnumber">삭제</a></div> */}
            <div><button onClick={onSubmitEdit}>수정</button></div>
            <div><button onClick={onSubmitMain}>목록</button></div>
          </div>
          <div className="GoodsImages">
            <img src={test.goods_img.split("#")[0]} />
          </div>
          <div className="GoodsPgUserInfo">
            <div className="GoodsPgUserInfoLeft">
              <div className="GoodsPgUserImg">이미지</div>
              <div>
                <div>이름</div>
                <div>ehdsp</div>
              </div>
            </div>
            <div className="GoodsPgUserInfoRight">매너온도</div>
          </div>
          <div className="GoodsPgContent">
            <div>
              <select>
              <option>판매중</option>
              <option>예약중</option>
              <option>거래완료</option>
              </select>
            </div>
            <div><h4>{test.goods_title}</h4></div>
            <div><h4>{test.goods_price}</h4></div>
            <div><h6>카테고리</h6></div>
            <div>{test.goods_description}</div>
            <div className="GoodsPgContentBottom">
              <div>채팅</div>
              <div>관심</div>
              <div>조회{test.goods_hit}</div>
            </div>
          </div>
          <div className="GoodsPgReport">
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
          </div>
          </>
        )}
      </div>
    )
  }
  else if(view === "main") {
    return(
      <GoodsPage test = {test}/>
    )
  }
  else if(view === "edit") {
    return (
      <GoodsPageEdit test = {test}/>
    )
  }
}

export default GoodsPage;