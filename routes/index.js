var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data',function(req,res,next){
	res.send({msg: 'hello world'});
});

module.exports = router;
