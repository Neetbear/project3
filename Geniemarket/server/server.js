const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const http = require("http").createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const fs = require('fs');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const pool = require("./mysqlcon");
var makeFolder = (dir) => {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
}
makeFolder("../public/uploadedFiles/");

// 로그인
app.post("/api/signin", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        var sQuery = `SELECT userid, userpassword, useraddress, usernickname FROM signuptestdb where userid='${req.body.signinid}'`;   
        connection.query(sQuery, (err, result, fields) => {
            if(err) throw err;

            console.log(result[0]);
            if(result.length == 0) {
                console.log("아이디 오류");
                connection.release();
                res.send({message: "id error"});
            }
            else if(req.body.signinid == result[0].userid) {
                if(req.body.signinpassword == result[0].userpassword) {
                    console.log("로그인 성공");
                    console.log(result[0])
                    connection.release();
                    res.send(result[0]);
                }
                else {
                    console.log("비밀번호 오류");
                    connection.release();
                    res.send({message: "password error"});
                }
            }; 
        });
    });
})

//회원가입
app.post("/api/signup", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        var sQuery = `INSERT INTO signuptestdb  (userid, userpassword, usernickname, useremail, userphonenumber, useraddress, useraddressdetail, usercategory) 
            VALUES ('${req.body.userid}', '${req.body.userpassword}', '${req.body.usernickname}', '${req.body.useremail}', '${req.body.userphonenumber}', '${req.body.useraddress}', '${req.body.useraddressdetatil}', '')`;
        var checkQuery = `SELECT userid FROM signuptestdb where userid='${req.body.userid}'`;
        // var sQuery2 = `SELECT * FROM userboard WHERE userid=${req.session.uid}`;
        
        connection.query(checkQuery, (err, result, fields) => {
            if(err) res.send({err: err});

            if(result[0]) {
                connection.release();
                console.log("이미 존재하는 아이디");
                res.send({message: "ID already exist"});
            } else {
                connection.query(sQuery, (err, result, fields) => {
                    if(err) throw err;
                
                    console.log("회원가입성공");
                });
                connection.release();
            };
        });
    });
});

//회원정보수정
app.post("/api/changeuser", (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;

    var sQuery = `UPDATE signuptestdb SET usernickname='${req.body.usernickname}', useremail='${req.body.useremail}', userphonenumber='${req.body.userphonenumber}', 
      useraddress='${req.body.useraddress}', useraddressdetail='${req.body.useraddressdetatil}' WHERE userid='${req.body.userid}'`;

    connection.query(sQuery, (err, result, fields) => {
      if(err) throw err;
      
      console.log("회원정보변경성공");
      connection.release();
    });
  });
});

//마이페이지
app.post("/api/mypage", (req, res) => {
  console.log(req.body.signinid);
  pool.getConnection((err, connection) => {
      if(err) throw err;

      var sQuery = `SELECT * FROM signuptestdb where userid='${req.body.signinid}'`;
      connection.query(sQuery, (err, result, fields) => {
          if(err) res.send({err: err});

          console.log(result[0]);
          connection.release();
          res.send(result[0]);
      });
  });
});

//게시판1

app.get("/api/mainboard", (req, res)=>{
  const sqlQuery = "SELECT * FROM board1;";
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, (err, result)=>{
      res.send(result);
      connection.release();
    })
  })
})

app.get("/api/board", (req, res)=>{ 
  const sqlQuery = "SELECT * FROM board1;";
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, (err, result)=>{
      res.send(result);
      connection.release();
    })
  })
})
app.post("/api/board", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const addr = req.body.addr;
  const name = req.body.name;
  const sqlQuery = `INSERT INTO board1 (title, content, addr,name, page_num) VALUES (?,?,?,?,0)`;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, [title, content, addr, name], (err, result) => {
      res.send('success!');
      connection.release();
    });
  });
});

app.post('/api/boardpage/:idx', (req, res) => {
  var idx = req.body.idx;
  var sql = "DELETE from board1 Where idx =?"
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sql, [idx], function(err, result){
      if(err) throw err;
      res.send()
      connection.release();
    })
  })
})

app.post("/api/mainboard", (req, set) =>{
  // console.log("hit test !!")
  const hit = req.body;
  console.log(hit)
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(`UPDATE board1 SET page_num=page_num+1 WHERE idx = ${hit.clickId}`,
      function(err, rows,clickId, fields) {
          if(err) {
              console.log("조회수 실패" + rows, clickId)
              // res.send(false)
              connection.release();
          } else {
              console.log("조회수 성공");
              // res.send(true)
              connection.release();
          }
      }
  )

  })
  
})

app.get('/api/boardpage/:idx', function(req, res){
  var idx = req.params.idx; // :idx 로 맵핑할 req 값을 가져온다
  var sql = "SELECT * from board1 where idx=?";
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
      connection.query(sql, [idx], function(err, result){  // 한개의 글만조회하기때문에 마지막idx에 매개변수를 받는다
          if(err) console.error("err : " + err);
          res.send(result);
          connection.release();
      });
  });
});


//지도
app.post("/api/map", (req, res) => {
  res.render(MapContainer);
});

var storage  = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, '../public/uploadedFiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ path.extname(file.originalname));
  },
});
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

app.get("/api/goodsboard", (req, res)=> {
  const sqlQuery = "SELECT * FROM testgoods;"
  pool.getConnection((err, connection) => {
    if(err) throw err;
    
    connection.query(sqlQuery, (err, result)=>{
      res.send(result);
      connection.release();
    })
  })
})

app.get("/api/goodspage/:goodsnumber", (req, res) => {
  var goodsnumber = req.params.goodsnumber
  // res.sendFile(path.join(__dirname, '../src/pages/GoodsPage/GoodsPage.js'))

  const sqlQuery = "SELECT * FROM testgoods WHERE goodsnumber= ?";

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(sqlQuery, [goodsnumber], (err, result) => {
      if(err) console.error("err: " + err);
      // res.send(rows);
      res.send(result);
      connection.release();
    })
  })
});

app.put("/api/goodsboard", (req, set) =>{
  // console.log("hit test !!")
  const hit = req.body;
  console.log(hit)
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(`UPDATE testgoods SET goods_hit=goods_hit+1 WHERE goodsnumber = ${hit.clickId}`,
      function(err, rows, fields) {
          if(err) {
              console.log("조회수 실패" + rows)
              // res.send(false)
              connection.release();
          } else {
              console.log("조회수 성공");
              // res.send(true)
              connection.release();
          }
      }
  )
  })
})

app.post(("/api/goodseditpage"), (req,res) => {
  const goodsnumber = req.body.goodsnumber;
  pool.getConnection((err, connection) => {
    if(err) throw err;

    connection.query(`SELECT * FROM testgoods WHERE goodsnumber = ${goodsnumber}`), function(err, result, fields) {
      if(err) throw err;

      console.log(result);
      res.send(result);
      connection.release();
    }
  })
})

app.post(("/api/goodsedit"), (req,res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;

    connection.query(`UPDATE testgoods SET goods_title='${req.body.goods_title}', goods_img='${req.body.goods_img}', goods_price='${req.body.goods_price}', goods_description='${req.body.goods_description}' WHERE goodsnumber='${req.body.goodsnumber}'`), function(err, result, fields) {
      if(err) throw err;

      console.log(result);
      res.send(result);
      connection.release();
    }
  })
})

app.get('/api/chat', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM messages', (err, messages) => {
      // console.log(messages)
      res.send(JSON.stringify(messages))
    });
  });
});

pool.getConnection((err, connection) => {
  if(err) throw err;
  console.log('testing')
  io.on("connection", (socket) => {
    console.log('확인용')
    socket.on("init", (payload) => {
      console.log(payload);
    });

    socket.on("send message", (msg) => {
      // console.log(msg);
      io.emit("receive message", { name : msg.name , message : msg.message, time : msg.time});
      console.log(msg.name)
      connection.query("INSERT INTO messages (name, msg, time) VALUES ('" + msg.name + "', '" + msg.message + "', now())", function (err, res) {
        if (err) console.error("err : " + err)
      });
      connection.query(`SELECT * FROM messages WHERE (name="${msg.name}")`, function (err, res) {
        if (err) console.error("err : " + err)
        io.emit('nickname', res)
      });
    });
  });
});

const port = 5001;
http.listen(port, () => console.log(`express is running on ${port}`));