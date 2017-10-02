'use strict';
const express = require(‘express’);
const bodyParser = require(‘body-parser’);
const request = require('request');
const http = require('http');

const base_url = 'http://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch?&type=all&image_size=300&affiliate_type=vc&affiliate_id=http%3a%2f%2fck%2ejp%2eap%2evaluecommerce%2ecom%2fservlet%2freferral%3fsid%3d3103511%26pid%3d882391693%26vc_url%3d&appid=dj0zaiZpPUZCV2h2YUZxdnZ5SCZzPWNvbnN1bWVyc2VjcmV0Jng9NmQ-';
let category = '13457';
let keyword = 'fashion';
let url = base_url + keyword + '&category_id=' + category;
// expressインスタンス生成
let app = express();
  
// テンプレートエンジンの設定
app.set("views", "./views");
app.set("view engine", "ejs");
   
// ミドルウエアの設定
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
// ルーティング設定
app.use("/shop", (function () {
	let router = express.Router();
         // GET: /shop/search
	 router.get("/search", function (request, response) {

// 検索クエリがない場合、初期表示
	 if (!query) {
	 	return response.render("./search/index.ejs");
	}
	// 検索クエリがある場合、データベースを検索して結果リストを表示



//var url = 'https://api.github.com/users/rsp';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
      console.log(data.html_url);
    }
});

	// ビューを表示
	return response.render("./search/result-list.ejs", data);
});


	// サーバー起動
	app.listen(3000);

