'use strict';
const
	rdfParser = require('../lib/rdf-parser.js'),
	expectedValue = require('./pg132.json');
	
exports.testRDFParser = function(test) {
	rdfParser(__dirname + '/pg132.rdf', function(err, book) {
		test.expect(11); // count of how many asserts there will be
		test.ifError(err);

		// // this will never show anything as book.authors .... why?? other things work, like typeof(book.authors), book.authors.length
		// console.log('book authors = ' + book.authors);
		
		// deepEqual is not working, seems related to why book.authors console.log won't work...
		// so do this more painful and fragile asserting...
		// --> needed to do .toArray() call on authors and subjects collections in rdf-parser.js to make this work https://pragprog.com/titles/jwnode/errata
		test.deepEqual(book, expectedValue, "book should match expected");
		// console.log('book.authors = ' + book.authors);
		// var array = ['test1', 'test3'];
		// console.log('test array = ' + array);
		
		test.equal(book._id, expectedValue._id);
		test.equal(book.title, expectedValue.title);
		test.equal(book.authors.length, expectedValue.authors.length);
		test.equal(book.authors[0], expectedValue.authors[0]);
		test.equal(book.authors[1], expectedValue.authors[1]);
		test.equal(book.subjects.length, expectedValue.subjects.length);
		test.equal(book.subjects[0], expectedValue.subjects[0]);
		test.equal(book.subjects[1], expectedValue.subjects[1]);
		test.equal(book.subjects[2], expectedValue.subjects[2]);
		
		test.done();
	});
};