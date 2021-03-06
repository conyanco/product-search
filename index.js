'use strict';
   
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
	//app.listen(3000);

