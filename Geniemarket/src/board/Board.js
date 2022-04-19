import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {   useState} from 'react';
import Axios from 'axios';

function Board() {
    const names = window.localStorage.getItem("loginUser")
    const addrs = window.localStorage.getItem("loginUserAddr").split(" ");
    const addrU = addrs[0] + " " + addrs[1];
    const [movieContent, setMovieContent] = useState({
        title: '',
        content: ''
      })

     
    const submitReview = ()=>{
        Axios.post('http://localhost:5001/api/board', {
          title: movieContent.title,
          content: movieContent.content,
          addr: addrU,
          name:names
        }).then(()=>{
          alert('등록 완료!');
        })
      };

      const getValue = e => {
        const { name, value } = e.target;
        setMovieContent({
          ...movieContent,
          [name]: value
        })
      };

    return(
        <div>
            <div className='form-wrapper'>
                <input
                    type='text'
                    placeholder='제목'
                    onChange={getValue}
                    name='title'
                />
                <CKEditor
                    editor={ClassicEditor}
                    onReady={editor => {  
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setMovieContent({
                    ...movieContent,
                    content: data
                    })
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
                />
            </div>
            <a href="./mainboard">
            <button className="submit-button" onClick={submitReview}>입력</button>
            </a>
        </div>
    )
}

export default Board;