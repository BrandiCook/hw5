var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// sets up handlebars for rendering w/template
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

// setups POST body processing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// processes GET requests
app.get('/', function(req,res){
	var getValues = [];
	for(var entry in req.query){
		getValues.push({"name" : entry, "value" : req.query[entry]});		
	}
	console.log(getValues);
	var getContext = {};
	getContext.entries = getValues;
	
  res.render('getPage', getContext);
});

// processes POST requests
app.post('/', function(req,res){
	var postValues = [];
	for(var entry in req.body){
		postValues.push({"name" : entry, "value" : req.body[entry]});
	}
	
	var postContext = {};
	postContext.entries = postValues;
  res.render('postPage', postContext);
});

// 404 page not page found
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//500 page everything broke on server
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started at: http://flip3.engr.oregonstate.edu:9286/' + app.get('port') + '; Ctrl-C to terminate.');
});