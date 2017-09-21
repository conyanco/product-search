‘use strict’;

const express = require("express");
const bodyParser = require("body-parser");
//const MongoClient = require("mongodb").MongoClient;
 
// expressインスタンス生成
const app = express();

const base_url = ‘’;
 
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
    let URL = "mongodb://localhost:27017/test";
    let MAX_ITEMS_PER_PAGE = 1;
    let query = request.query.q;
    let page =request.query.pg ? parseInt(request.query.pg) : 1;
 
    // 検索クエリがない場合、初期表示
    if (!query) {
      return response.render("./search/index.ejs");
    }
 
    // 検索クエリがある場合、データベースを検索して結果リストを表示
    MongoClient.connect(URL).then((db) => {
      return Promise.all([
        // 検索総ヒット数
        db.collection("shops").find({
          name: new RegExp(`.*${query}.*`)
        }).count(),
        // 現在ページに表示する内容
        db.collection("shops").find({
          name: new RegExp(`.*${query}.*`)
        }).skip((page - 1) * MAX_ITEMS_PER_PAGE).limit(MAX_ITEMS_PER_PAGE).toArray()
      ]);
    }).then((results) => {
      // ビューへ渡すデータを整形
      let data = {
        count: results[0],
        list: results[1],
        pagination: {
          max: Math.ceil(results[0] / MAX_ITEMS_PER_PAGE),
          current: page,
          isFirst: page === 1,
          isLast: page === Math.ceil(results[0] / MAX_ITEMS_PER_PAGE)
        },
        query: query
      };
      // ビューを表示
      return response.render("./search/result-list.ejs", data);
    }).catch((reason) => {
      // エラー処理
      console.log(reason);
    });
 
  return router;
})());
 
// サーバー起動
app.listen(3000);