# project3
### react를 이용하여 프론트 백 서버를 분리하여 홈페이지를 만들기

서로 다른 url 통신간에 브라우저에서 보안상 막아서 발생하는 cors 오류는 cors모듈을 사용하였다
```
const cors = require("cors");
app.use(cors());
// 나중에 공부해보니 정확히 사용해주기 위해선 cors 인자들을 정확히 줄 필요성이 있었다
app.use(cors({
    origin:['http://localhost:4000'],
    credentials: true
}))
``` 

이번에도 로그인시 필요한 정보는 캐시로 저장하여 사용하였다
``` 
window.localStorage.setItem("loginUserAddr", response.data.useraddress)
window.localStorage.setItem("loginStatus", JSON.stringify({ status: "success" }))
window.localStorage.setItem("loginUser", signinid)
window.localStorage.setItem("loginNickname", response.data.usernickname)
``` 

당근마켓 클론이라는 점에서 지도api가 필요하여 kakao api를 사용하였다
리액트에서는 react-daum-postcode 패를 통해서 카카오 지도 api 사용이 가능하다
``` 
import DaumPostCode from 'react-daum-postcode';
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
``` 

판매 상품을 올리기 위해서 사진 업로드가 필요하나 무료 db의 한계로 public폴더에 uploadedFiles를 만들어주고 그 폴더에서 이미지 파일을 저장받고 그 폴더에서 이미지를 읽어오는 방식으로 하였다
이때 multer 모듈을 사용하였다
``` 
const multer = require('multer');
makeFolder("../public/uploadedFiles/");
var storage  = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, '../public/uploadedFiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ path.extname(file.originalname));
  },
});
var uploadWithOriginalFilename = multer({ storage: storage });

app.post("/api/goodsupload", uploadWithOriginalFilename.array("images"), async function(req, res, next) {
  let filesname = '';
  for (let i = 0; i < req.files.length; i++) {
    filesname += '/uploadedFiles/'+req.files[i].filename+"#";
  }
  console.log(filesname);
  const title = req.body.title;
  const price = req.body.price;
  const address = req.body.address;
  const description = req.body.description;
  const sqlQuery = `INSERT INTO testgoods (goods_title, goods_img, goods_price, goods_addr, goods_description, goods_hit) values (?, ?, ?, ?, ?, 0);`
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, [title, filesname, price, address, description], (err, result) => {
      if(err) throw err;

      console.log(result);
      res.send('success!');
      connection.release();
    });
  });
});
``` 

프로젝트를 마칙고 나서 리덕스를 사용할 필요성을 느꼈으며, react-router-dom 버전이 변하며 사용법이 많이 바뀌는 것을 확인하고 여러 차이점을 찾아가며 고치는 것에 어려움을 느꼈다
또한 mac에서는 5000번 port를 사용할 수 없다는 것을 처음알고 포트 선택도 주의해야 한다는 것을 알았다
