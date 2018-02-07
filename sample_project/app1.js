
const express = require('express');
const app = express();
const message = require('./message.js');
var all_letters = '';

console.log(message["letters"]);

app.get("/",function(request,response){

	for (let i = 0; i <= message["letters"].length -1; i++) {
		all_letters += message["letters"][i] + "<br/>";
	}
	response.send("<h1>Welcome to my app</h1>" + all_letters);
})

app.get("/users/:name", function(request, response){
	response.send("Hello " + request["params"]["name"]);
})

app.listen(3000, function(error) {
	if (error == true) {
		console.log("An error has occurred");
	} else { 
		console.log("Listening on port 3000");
	}
});

