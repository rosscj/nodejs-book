#!/usr/bin/env node --harmony
const
	request = require('request'),
	options = {
		method: process.argv[2] || 'GET',
		url: 'http://localhost:5984/' + process.argv[3] || ''
	};
// console.log('url = '+ options.url);
// console.log('stringified url = '+ JSON.stringify(options.url));
// console.log('argv = '+ process.argv[3]);
// console.log('argv stringified = '+ JSON.stringify(process.argv[3]));
request(options, function(err, res, body) {
	if (err) {
		throw Error(err);
	} else {
		console.log(res.statusCode, JSON.parse(body));
	}
});