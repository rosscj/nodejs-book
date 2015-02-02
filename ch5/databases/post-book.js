'use strict';
const
	request = require('request'),
	doc = {
		"_id": "6",
		"title": "NodeJS the right way",
		"authors": [
			"Jim R. Wilson"
		],
		"subjects": [
			"Node js"
		]		
	};
	
request({
	method: 'PUT',
	url: 'http://localhost:5984/books/' + doc._id,
	json: doc
}, function(err, res, body) {
	if (err) {
		throw Error(err);
	}
			
	console.log(res.statusCode, body);
});