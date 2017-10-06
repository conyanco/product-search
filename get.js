// expressの読み込み
var express = require('express');
// serverオブジェクトの作成
var app = express.createServer();
// ejsのレイアウトをoff
app.set('view options', { layout: false });
// getでリクエストがきたときの処理 ---- ★
app.get('/', function(req, res){
  console.log(req.query); // for logging
  var name = "";
  // NAMEパラメタが空でなければ画面に表示
  if (req.query.name) {
    name = req.query.name;
  }
  res.render('get.ejs', { locals: { name: name } });
});
app.listen(3000);