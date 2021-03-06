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
            alert("??????????????? ????????????.")
        } else{
            fetchsignup();
            alert("???????????????????")
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
            <h2>????????????</h2>
            <form onSubmit={onSignupSubmitHandler} method="POST" className="formline">
                <label className="labels">????????? : </label>
                <input type="text" value={userid || ''} onChange={onUseridHandler} placeholder="???????????? ???????????????" className="inputs"/>
                <br />
                <label className="labels">???????????? : </label>
                <input type="password" value={userpassword || ''} onChange={onUserpasswordHandler} placeholder="??????????????? ???????????????" className="inputs"/>
                <br />
                <label className="labels">???????????? ?????? : </label>
                <input type="password" value={checkpassword || ''} onChange={onCheckpasswordHandler} placeholder="??????????????? ?????? ??????????????????" className="inputs"/>
                <br />
                <label className="labels">????????? : </label>
                <input type="text" value={usernickname || ''} onChange={onUsernicknameHandler} placeholder="???????????? ???????????????" className="inputs"/>
                <br />
                <label className="labels">????????? : </label>
                <input type="text" value={useremail || ''} onChange={onUseremailHandler} placeholder="????????? ???????????????" className="inputs"/>
                <br />
                <label className="labels">???????????? : </label>
                <input type="text" value={userphonenumber || ''} onChange={onUserphonenumberHandler} placeholder="??????????????? ???????????????" className="inputs"/>
                <br />
                <label className="labels">?????? : </label>
                <input type="text" value={useraddress || ''} onClick={onOpenPosthandler} placeholder="????????? ???????????????" readOnly className="inputs"/>
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
                <label className="labels">???????????? : </label>
                <input type="text" value={useraddressdetail || ''} onChange={onUseraddressdetailHandler} placeholder="?????? ????????? ???????????????" className="inputs"/>
                <br />
                {/* <label>
                    ??????/????????????
                    <input type="checkbox" name="checkbox1" value="??????/????????????" />
                </label>
                <br />
                <label>
                    ????????????
                    <input type="checkbox" name="checkbox2" value="????????????" />
                </label>
                <br />
                <label>
                    ??????/??????
                    <input type="checkbox" name="checkbox3" value="??????/??????" />
                </label>
                <br />
                <label>
                    ????????????
                    <input type="checkbox" name="checkbox4" value="????????????" />
                </label>
                <br />
                <label>
                    ????????????
                    <input type="checkbox" name="checkbox5" value="????????????" />
                </label>
                <br />
                <label>
                    ??????/??????/??????
                    <input type="checkbox" name="checkbox6" value="??????/??????/??????" />
                </label>
                <br />
                <label>
                    ????????????
                    <input type="checkbox" name="checkbox7" value="????????????" />
                </label>
                <br />
                <label>
                    ?????????/??????
                    <input type="checkbox" name="checkbox8" value="?????????/??????" />
                </label>
                <br />
                <label>
                    ??????/??????
                    <input type="checkbox" name="checkbox9" value="??????/??????" />
                </label>
                <br />
                <label>
                    ??????????????????
                    <input type="checkbox" name="checkbox10" value="??????????????????" />
                </label>
                <br />
                <label>
                    ??????????????????
                    <input type="checkbox" name="checkbox11" value="??????????????????" />
                </label>
                <br /> */}
                <button type="submit" className="buttons">????????????</button>
            </form>
        </>
    );
};

export default Signup;