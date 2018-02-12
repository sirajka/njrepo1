const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017'; //this differs from tutorial due to new mongo db
const objectId = require('mongodb').ObjectId;

app.use("/", express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");

});

app.get("/tasks", function(req,res) {

	mongoClient.connect(url, function(error,client) {
		if (error) {
			console.log(error) 
		} else {
			try {
				let db = client.db('TodoDB');
				let tasks = db.collection('tasks');
				tasks.find({}).toArray( function(err,result){
						res.send(JSON.stringify(result));		
				});
			} catch (err) {
				console.log(err);
			}
		}
	});
});

app.post("/tasks/new", function(req,res) {
	mongoClient.connect(url, function(error,client) {
		if (error) {
			console.log(error) 
		} else {
			try {
				let db = client.db('TodoDB');
				let tasks	= db.collection('tasks');
				tasks.insert({
					timestamp: new Date(),
					description: req.body.description
				})
			} catch (err) {
				console.log(err);
			}
		}
	});
	console.log("Done insert");
	res.end();
});

app.put("/tasks/update/:id",function(req,res){
	mongoClient.connect(url, function(error,client) {
		if (error) {
			console.log(error) 
		} else {
			try {
				let db = client.db('TodoDB');
				let tasks	= db.collection('tasks');
				tasks.update({_id : new objectId(req.params.id)},
					{$set: {description: req.body.description}})
			} catch (err) {
				console.log(err);
			}
		}
	});
	console.log("Done update");
	res.end();
});

app.delete("/tasks/delete/:id",function(req,res){
	mongoClient.connect(url, function(error,client) {
		if (error) {
			console.log(error) 
		} else {
			try {
				let db = client.db('TodoDB');
				let tasks	= db.collection('tasks');
				tasks.remove({_id : new objectId(req.params.id)},
					{$set: {description: req.body.description}})
			} catch (err) {
				console.log(err);
			}
		}
	});
	console.log("Done delete");
	res.end();
});

app.listen(3000);



