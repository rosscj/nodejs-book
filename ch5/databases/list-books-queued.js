'use strict';
const
	async = require('async'),
	file = require('file'),
	rdfParser = require('./lib/rdf-parser.js'),
	
	work = async.queue(function(path, done) {
		rdfParser(path, function(err, doc) {
			console.log(doc);
			done(); // callback worker function calls to signal work queue that it is free (part of async)
		});
	}, 1000); // 1000 is concurrency limit
	
console.log('beginning directory walk');

file.walk(__dirname + '/cache', function(err, dirPath, dirs, files) {
	files.forEach(function(path) {
		work.push(path);
	});
});	