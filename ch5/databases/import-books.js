'use strict';
const
	request = require('request'),
	async = require('async'),
	file = require('file'),
	rdfParser = require('./lib/rdf-parser.js'),
	
	work = async.queue(function(path, done) {
		rdfParser(path, function(err, doc) {
			request({
				method: 'PUT',
				url: 'http://localhost:5984/books/' + doc._id,
				json: doc
			}, function(err, res, body) {
				if (err) {
					throw Error(err);
				}
						
				console.log(res.statusCode, body);
				done(); // callback worker function calls to signal work queue that it is free (part of async)
			});
		});
	}, 1000); // 1000 is concurrency limit, book expected this to be to much for conncurrent dataabase connections and suggested changing
			  // it to 10, but it did not error for me
	
console.log('beginning directory walk');

file.walk(__dirname + '/cache', function(err, dirPath, dirs, files) {
	files.forEach(function(path) {
		work.push(path);
	});
});	