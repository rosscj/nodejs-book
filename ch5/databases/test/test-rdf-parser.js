'use strict';
const
	rdfParser = require('../lib/rdf-parser.js'),
	expectedValue = require('./pg132.json');
	
exports.testRDFParser = function(test) {
	rdfParser(__dirname + '/pg132.rdf', function(err, book) {
		test.expect(1); // example says this should be 2.... don't know what it means...
		test.ifError(err);
		console.log('id = ' + book._id);
		console.log('title = ' + book.title);
		console.log('authors = ' + book.authors);
		console.log('subjects = ' + book.subjects);
		console.log('book = ' + book);
		// console.log(book);
		//test.deepEqual(book, expectedValue, "book should match expected");
		test.done();
	});
};