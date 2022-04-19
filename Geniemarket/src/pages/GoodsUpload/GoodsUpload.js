import React, { useState } from "react";
import './GoodsUpload.css'
import { CgClose } from 'react-icons/cg';
import GoodsImgUpload from "./GoodsImgUpload";
import { GrFormNext } from 'react-icons/gr';
import { MdPostAdd } from 'react-icons/md';
import { BsSliders } from 'react-icons/bs';
import axios from "axios";

function GoodsUpload() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downFiles, setDownFiles] = useState([]);
  const addr = window.localStorage.getItem("loginUserAddr").split(' ');

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value)
  }
  const onPriceHandler = (event) => {
    setPrice(event.currentTarget.value)
  }
  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value)
  }

  let formData = new FormData();
  

  const submitGoods = async() => {
    formData.append("title", title);
    formData.append("price", price);
    formData.append("address", addr[2]);
    formData.append("description", description);
    for (let i = 0; i < downFiles.length; i++) {
      formData.append('images', downFiles[i]);
    }

    axios.post('http://localhost:5001/api/goodsupload', formData).then(()=> {
      alert('등록 완료!');
    })
    .then(window.location.replace('/goodsboard'))
  }
  
  return (
    <div className="GoodsUploadTemplate">
      <div className="GoodsUploadHead">
        <div><CgClose /></div>
        <div className="GoodsUploadHeader">중고거래 글쓰기</div>
        <div>
          <button className="submit-button" onClick={submitGoods}>입력</button>
        </div>
      </div>
      <div>
        <GoodsImgUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} downFiles={downFiles} setDownFiles={setDownFiles}/>
      </div>
      <div className="GoodsUploadTitle">
        <input type="text" placeholder="글 제목" className="GoodsUploadTitleBox" value={title || ''} onChange={onTitleHandler} />
      </div>
      <div className="GoodsUploadCategory">
        <div>카테고리 선택</div>
        <GrFormNext />
      </div>
      <div className="GoodsUploadPrice">
        <input type="text" placeholder="₩ 가격" className="GoodsUploadPriceBox" value={price || ''} onChange={onPriceHandler} />
        <div>
          <input type="checkbox" id="goodsPrice" />
          <label >가격 제안받기</label>
        </div>
      </div>
      <div className="GoodsUploadContents">
        <input type="textarea" id="goodsContents" placeholder="000동에 올릴 게시글 내용을 작성해주세요.(가품 및 판매 금지품목은 게시가 제한될 수 있어요.)" value={description || ''} onChange={onDescriptionHandler} />
      </div>
      <div className="GoodsUploadFooter">
        <div><MdPostAdd />자주 쓰는 문구 </div>
        <div><BsSliders /> 보여줄 동네 설정 : <input type="text" value = {addr[2] || ''} /></div>
      </div>
    </div>
  )
}

export default GoodsUpload;