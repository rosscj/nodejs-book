'use strict';
const
	request = require('request'),
	doc = {
		"_id": "5",
		"title": "two authors, one subject",
		"authors": [
			"Sam Ross",
			"Chris Ross"
		],
		"subjects": [
			"lego building"
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