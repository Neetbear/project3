//유튜브 강의보고 진행

import React, { useState } from "react";
import styled from "styled-components";
import { IoIosCamera } from 'react-icons/io';
import './imgUpload.css'

const GoodsImgUploadBlock = styled.div`
  padding: 15px 32px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
`;

const GoodsImgUploading = styled.div`
  box-sizing: border-box;
  width: 45px; height: 45px;
  border: 1px solid black;
  border-radius: 5%;
  text-align: center;
  padding-top: 5px;
  margin-right: 5px;
`;

const PreviewImg = styled.div`
  box-sizing: border-box;
  width: 45px; height: 45px;
  border: 1px solid black;
  border-radius: 5%;
`;


function GoodsImgUpload() {

  const [사진, 사진갯수변경] = useState(0);

  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  
  return (
    <>
      <GoodsImgUploadBlock>
        <label for="imgFile">
            <GoodsImgUploading>
              <IoIosCamera /><br />
              { 사진 } / 10
            </GoodsImgUploading>
          </label>
        <div style={styles.container}>
          <input
            accept="image/*"
            type="file"
            id="imgFile"
            multiple
            onInput={ () => {사진갯수변경(사진 +1)}}
            onChange={imageChange}
          />
        </div>
        <PreviewImg>
          {selectedImage && (
            <div style={styles.preview}>
              <img
                src={URL.createObjectURL(selectedImage)}
                style={styles.image}
                alt="Thumb"
              />
              <button onClick={removeSelectedImage} style={styles.delete}>
                Remove This Image
              </button>
            </div>
          )}
        </PreviewImg>
      </GoodsImgUploadBlock>
    </>
  )
}

export default GoodsImgUpload;

const styles = {
  // container: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingTop: 50,
  // },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};