var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data',function(req,res,next){
	res.send({msg: 'hello world2'});
});

/**
 * req.query.type:新闻类型--暂时有allnews(最新)/press(新闻)/announce(公告)/medium(媒体)
 * req.query.key:新闻列表页数
 * return:articles--分装好的新闻对象集合
**/
router.get('/news',function(req,res,next){
	req.query.key = req.query.key||1;
	var url = 'http://xw.jx3.xoyo.com/'+req.query.type+'/?page_mainList='+req.query.key||0; 
	console.log(url);
	request(url,function(e,response,body){
		if(e){res.send({status:0})};
		var $ = cheerio.load(body);
		var pages = parseInt($('.pagination').children('a').eq(3).text());
		var total = parseInt($('.pagination').text().substr(2));
		var articles = [];	//用于存储文章信息
		$('.news_web_list').find('li').map(function(i,v,a){
			var article = {
					time: $(v).find('em').text(),
					title: $(v).find('a').attr('title'),
					href: $(v).find('a').attr('href'),
					text: $(v).find('a').text()
				}
			var patt = new RegExp('^http://');
			if(!patt.test(article.href)){
				article.href = 'http://xw.jx3.xoyo.com'+article.href;
			}
			articles.push(article);
		})
		res.send(articles);
	})
});

module.exports = router;
