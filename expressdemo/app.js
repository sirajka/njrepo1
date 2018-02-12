const express = require('express');
const app = express();
const mustache = require('mustache-express');

app.use("/", express.static(__dirname + '/public')); //1

app.engine('html', mustache());
app.set('view engine', 'html'); //2
app.set('views', __dirname + '/views');

app.get("/", function(req,res) {
	res.render("index"); //no extension or folder specified since those are set above 1,2
});

app.listen(3000);


