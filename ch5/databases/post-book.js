'use strict';
const
	request = require('request'),
	doc = {
		"_id": "4",
		"title": "one author, three subjects",
		"authors": [
			"Sam Ross"
		],
		"subjects": [
			"Emily",
			"Dylan",
			"boo guys"
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