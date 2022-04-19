import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './GoodsUpload.css'
import { CgClose } from 'react-icons/cg';
import GoodsImgUpload from "./GoodsImgUpload";
import { GrFormNext } from 'react-icons/gr';
import { MdPostAdd } from 'react-icons/md';
import { BsSliders } from 'react-icons/bs';
import axios from "axios";

export default function GoodsEdit() {
  const params = useParams();
  const [goodsnumber, setGoodsnumber] = useState(params.goodsnumber);
  const [goods_title, setGoods_title] = useState('');
  const [goods_img, setGoods_img] = useState('');
  const [goods_price, setGoods_price] = useState('');
  const [goods_description, setGoods_description] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  console.log("goodsnumber"+goodsnumber)
  
  useEffect(() => {
    axios.post(`http://localhost:5001/api/goodspage/goodsnumber`, {
      goodsnumber: goodsnumber
    })
    .then((res) => {
      console.log(res.data)
      setGoods_description(res.goods_description)
      setGoods_price(res.goods_price)
      setGoods_title(res.goods_title)
    })
  },[])

  const onSetGoodsTitleHandler = (event) => {
    setGoods_title(event.currentTarget.value)
  }
  const onSetGoodsPriceHandler = (event) => {
      setGoods_price(event.currentTarget.value)
  }
  const onSetGoodsDescriptionHandler = (event) => {
    setGoods_description(event.currentTarget.value)
  }

  const onChangeGoodsEditSubmitHandler = async() => {
    axios.post(`http://localhost:5001/api/goodsedit`, {
      goodsnumber: goodsnumber,
      goods_title: goods_title,
      goods_img: goods_img,
      goods_price: goods_price,
      goods_description: goods_description
    }).then(window.location.replace("/goodsboard"));
  };

  
  return (
    <div className="GoodsUploadTemplate">
      <div className="GoodsUploadHead">
        <div><CgClose /></div>
        <div>중고거래 글쓰기</div>
        <div>
          <a href="/goodsboard"><button className="submit-button" onClick={onChangeGoodsEditSubmitHandler}>입력</button></a>
        </div>
      </div>
      <GoodsImgUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
      <div className="GoodsUploadTitle">
        <input type="text" placeholder="글 제목" className="GoodsUploadTitleBox" value={goods_title || ''} onChange={onSetGoodsTitleHandler} />
      </div>
      <div className="GoodsUploadCategory">
        <div>카테고리 선택</div>
        <GrFormNext />
      </div>
      <div className="GoodsUploadPrice">
        <input type="text" placeholder="₩ 가격 (선택사항)" className="GoodsUploadPriceBox" value={goods_price || ''} onChange={onSetGoodsPriceHandler} />
        <div>
          <input type="checkbox" id="goodsPrice" />
          <label >가격 제안받기</label>
        </div>
      </div>
      <div className="GoodsUploadContents">
        <input type="textarea" id="goodsContents" placeholder="000동에 올릴 게시글 내용을 작성해주세요.(가품 및 판매 금지품목은 게시가 제한될 수 있어요.)" value={goods_description || ''} onChange={onSetGoodsDescriptionHandler} />
      </div>
      <div className="GoodsUploadFooter">
        <div><MdPostAdd />자주 쓰는 문구 </div>
        <div><BsSliders /> 보여줄 동네 설정</div>
      </div>
    </div>
  )
}
