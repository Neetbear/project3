const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log('http://localhost:5001/api/');
    res.send({title: '이삭이바보'});
});

module.exports = router;