const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017'; //this differs from tutorial due to new mongo db

mongoClient.connect(url, function(error,client) {
	if (error) {
		console.log(error) 
	} else {
		let db = client.db('Tutorials');
		let animals	= db.collection('animals');
		animals.updateOne({"name":"bunny"}, {$set:{"weight":"7lb"}}, {upsert: true})
		animals.find({}).toArray( function(err,result){
			console.log(JSON.stringify(result));		
		})
	}
 });

