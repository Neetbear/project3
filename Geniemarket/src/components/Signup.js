import React, { useState }  from "react";
import { useDispatch } from 'react-redux'  
import DaumPostCode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './sign.css'

function Signup(props) {
    let navigate = useNavigate();

    const [userid, setUserid] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [checkpassword, setUsercheckpassword] = useState('');
    const [usernickname, setUsernickname] = useState('');
    const [useremail, setUseremail] = useState('');
    const [userphonenumber, setUserphonenumber] = useState('');
    const [useraddress, setUseraddress] = useState('');
    const [useraddressdetail, setUseraddressdetail] = useState('');
    const [isDaumPost, setIsDaumPost] = useState(false);
    // const [usercategory, setUsercategory] = useState('');

    const onUseridHandler = (event) => {
        setUserid(event.currentTarget.value)
    }
    const onUserpasswordHandler = (event) => {
        setUserpassword(event.currentTarget.value)
    }
    const onCheckpasswordHandler = (event) => {
        setUsercheckpassword(event.currentTarget.value)
    }
    const onUsernicknameHandler = (event) => {
        setUsernickname(event.currentTarget.value)
    }
    const onUseremailHandler = (event) => {
        setUseremail(event.currentTarget.value)
    }
    const onUserphonenumberHandler = (event) => {
        setUserphonenumber(event.currentTarget.value)
    }
    const onUseraddressdetailHandler = (event) => {
        setUseraddressdetail(event.currentTarget.value)
    }
    // const onUsercategoryHandler = (event) => {
    //     setUsercategory(event.currentTarget.value)
    // }

    const onOpenPosthandler = () => {
        setIsDaumPost(true)
    }
    const onAddresshandler = (data) => {
        let AllAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setUseraddress(AllAddress);
        setIsDaumPost(false)
    }

    const onSignupSubmitHandler = (event) => {
        event.preventDefault();
        if(checkpassword !== userpassword) {
            alert("비밀번호가 다릅니다.")
        } else{
            fetchsignup();
            alert("회원가입완료?")
        }
    }
    const fetchsignup = async() => {
        axios.post("http://localhost:5001/api/signup", {
            userid: userid,
            userpassword: userpassword,
            usernickname: usernickname,
            useremail: useremail,
            userphonenumber: userphonenumber,
            useraddress: useraddress,
            useraddressdetail: useraddressdetail
        }).then(response=> console.log(response)).then(navigate("/signin"));
    };
    
    return(
        <>
            <h2>회원가입</h2>
            <form onSubmit={onSignupSubmitHandler} method="POST" className="formline">
                <label className="labels">아이디 : </label>
                <input type="text" value={userid || ''} onChange={onUseridHandler} placeholder="아이디를 입력하세요" className="inputs"/>
                <br />
                <label className="labels">비밀번호 : </label>
                <input type="password" value={userpassword || ''} onChange={onUserpasswordHandler} placeholder="비밀번호를 입력하세요" className="inputs"/>
                <br />
                <label className="labels">비밀번호 확인 : </label>
                <input type="password" value={checkpassword || ''} onChange={onCheckpasswordHandler} placeholder="비밀번호를 다시 입력해주세요" className="inputs"/>
                <br />
                <label className="labels">닉네임 : </label>
                <input type="text" value={usernickname || ''} onChange={onUsernicknameHandler} placeholder="닉네임을 입력하세요" className="inputs"/>
                <br />
                <label className="labels">이메일 : </label>
                <input type="text" value={useremail || ''} onChange={onUseremailHandler} placeholder="이메일 입력하세요" className="inputs"/>
                <br />
                <label className="labels">전화번호 : </label>
                <input type="text" value={userphonenumber || ''} onChange={onUserphonenumberHandler} placeholder="전화번호를 입력하세요" className="inputs"/>
                <br />
                <label className="labels">주소 : </label>
                <input type="text" value={useraddress || ''} onClick={onOpenPosthandler} placeholder="주소를 입력하세요" readOnly className="inputs"/>
                {
                    isDaumPost ?
                        <DaumPostCode
                            onComplete={onAddresshandler}
                            autoClose
                            isDaumPost={isDaumPost}
                        />
                    : null
                }
                <br />
                <label className="labels">상세주소 : </label>
                <input type="text" value={useraddressdetail || ''} onChange={onUseraddressdetailHandler} placeholder="상세 주소를 입력하세요" className="inputs"/>
                <br />
                {/* <label>
                    가구/인테리어
                    <input type="checkbox" name="checkbox1" value="가구/인테리어" />
                </label>
                <br />
                <label>
                    전자기기
                    <input type="checkbox" name="checkbox2" value="전자기기" />
                </label>
                <br />
                <label>
                    뷰티/미용
                    <input type="checkbox" name="checkbox3" value="뷰티/미용" />
                </label>
                <br />
                <label>
                    남성패션
                    <input type="checkbox" name="checkbox4" value="남성패션" />
                </label>
                <br />
                <label>
                    여성패션
                    <input type="checkbox" name="checkbox5" value="여성패션" />
                </label>
                <br />
                <label>
                    도서/티켓/음반
                    <input type="checkbox" name="checkbox6" value="도서/티켓/음반" />
                </label>
                <br />
                <label>
                    가전제품
                    <input type="checkbox" name="checkbox7" value="가전제품" />
                </label>
                <br />
                <label>
                    스포츠/레터
                    <input type="checkbox" name="checkbox8" value="스포츠/레저" />
                </label>
                <br />
                <label>
                    게임/취미
                    <input type="checkbox" name="checkbox9" value="게임/취미" />
                </label>
                <br />
                <label>
                    반려동물용품
                    <input type="checkbox" name="checkbox10" value="반려동물용품" />
                </label>
                <br />
                <label>
                    기타중고물품
                    <input type="checkbox" name="checkbox11" value="기타중고물품" />
                </label>
                <br /> */}
                <button type="submit" className="buttons">회원가입</button>
            </form>
        </>
    );
};

export default Signup;