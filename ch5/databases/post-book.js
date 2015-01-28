'use strict';
const
	request = require('request'),
	doc = {
		"_id": "3",
		"title": "chris test book",
		"authors": [
			"Chris Ross",
			"Joe Jones"
		],
		"subjects": [
			"Node js",
			"Javascript"
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