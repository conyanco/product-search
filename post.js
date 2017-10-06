// expressの読み込み
var express = require('express');
// serverオブジェクトの作成
var app = express.createServer();
// ejsのレイアウトをoff
app.set('view options', { layout: false });
// postデータを扱う際のおまじない ---- ★2
app.use(express.bodyDecoder());
// 初回アクセスの処理
app.get('/', function(req, res){
  res.render('post.ejs', { locals: { name: "" } });
});
// postの処理 ---- ★1
app.post('/', function(req, res){
  console.log(req.body); // for logging
  var name = "";
  if (req.body.name) {
    // postデータはreq.body.xxxで受け取る
    name = req.body.name;
  }
  res.render('post.ejs', { locals: { name: name } });
});
app.listen(3000);