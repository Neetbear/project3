import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import styled, { css } from "styled-components";

const { kakao } = window;

const Title = styled.div`
  color: red;
`
const 게시글 = styled.div`
border : dotted;
left: 0;
bottom: 0;
height: 400px;
width: 250px;
margin:10px 0 30px 10px;
padding:5px;
overflow-y:auto;
background:rgba(255, 255, 255, 0.7);
z-index: 1;
font-size:12px;
border-radius: 10px;
padding-bottom: 0;
float: left;
`

const MapContainer = ({}) => {

  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
    };  

    var map = new kakao.maps.Map(mapContainer, mapOption); 

    var geocoder = new kakao.maps.services.Geocoder();
    
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});


    var x = window.localStorage.getItem("loginUserAddr")

    geocoder.addressSearch( x, function(result, status) { //'<%= userInfo %>' 이게 서울시 이기 때문에 지도에 바로 서울시가 찍힌다.
     
      // 정상적으로 검색이 완료됐으면 
      console.log(x)
 
       if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });
        
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: window.localStorage.getItem("loginUser")
          });
          infowindow.open(map, marker);
  
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
      // console.log(coords);
          console.log()
      } 
    
  });

  //////////////////마커변경
      
  displayMarker('천호동')
      function displayMarker(place) {

        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(place.y, place.x) ; // 마커가 표시될 위치입니다
    
    // 마커를 생성합니다
    var marker1 = new kakao.maps.Marker({
        position: markerPosition, 
        image: markerImage // 마커이미지 설정 
    });
    
      /////////////마커 변경 끝
          
          // 마커에 클릭이벤트를 등록
kakao.maps.event.addListener(marker1, 'click', function() {
  // 마커를 클릭하면 장소명이 인포윈도우에 표출
  infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
  infowindow.open(map, marker1);

 
});

var geocoder = new kakao.maps.services.Geocoder();

//=====================

kakao.maps.event.addListener(map, 'idle', function() {
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}

function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
      var infoDiv = document.getElementById('centerAddr');

      for(var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[0].region_type === 'H') {
              infoDiv.innerHTML = result[0].address_name;
              break;
          }
      }
  }    
}

//=========================클릭 이벤트 STATT HERE


  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            var content = '<div class="bAddr">' +
                            '<span class="title">주소정보</span>' + 
                            detailAddr + 
                        '</div>';

                        // console.log(content)

            // 마커를 클릭한 위치에 표시합니다 
            marker1.setPosition(mouseEvent.latLng);
            marker1.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker1);
        }   
    });
  });
//////////////////////클릭이벤트 
      }
  }, []);
  const addr = window.localStorage.getItem("loginUserAddr").split(' ')
  const [goodsContent, setGoodsContent] = useState([]);
  
  const [viewContent , setViewContent] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:5001/api/goodsboard')
    .then((response) => {setGoodsContent(response.data);
    console.log(response.data[0].goods_img)})
    .catch(err=>console.log(err))
  }, []);

  return (
    <>
    
    <h1>MAP</h1>
      <div id='map' style={{
          width: '70%', 
          height: '600px',
          float: 'left'
      }}>
      </div>
     
      <게시글><div className='게시글'>
      <div className="goodsBoardHead">매물</div>
       내 주소: {window.localStorage.getItem("loginUserAddr")}
      </div>
      <div>
        {goodsContent.map(element =>
        {if(element.goods_addr == addr[2]){
          {console.log(addr[2])}
          return<div>
            <div>
            <div><a href={`/goodspage/${element.goodsnumber}`}> 이름: {element.goods_title}</a></div>
              <p> 물건 가격: {element.goods_price}</p>

            </div>
            {console.log(addr[2])}
          </div>
          } }
        ).reverse()}
      </div>
      </게시글>
      </> 
  );

}



export default MapContainer;

//   {viewContent.map(element =>
//     {addr[2] === (element.title) ?
//     <div className="title">
//         <p><b>{element.title}</b> &nbsp;{addr[1] + " " +addr[2]}</p>
//         {console.log(element.title)}
//         <div className="cont">
//             {ReactHtmlParser(element.content)}
//         </div>
//     </div>:null
//     }
// )} 