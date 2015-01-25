'use strict';
const
	fs = require('fs'),
	cheerio = require('cheerio');
	
module.exports = function(filename, callback) {
	fs.readFile(filename, function(err, data) {
		if (err) { return callback(err); }
		let
			$ = cheerio.load(data.toString()),
			collect = function(index, elem) {
				// console.log('hit collect with elem text = ' + $(elem).text());
				return $(elem).text();
			};
		
		// //console.log('pgterms\\:marc260 = ' + $('pgterms\\:marc260').text());
		// // console.log("$('marcrel\\trl pgterms\\:agent pgterms\\:name') = " + $('marcrel\\:trl pgterms\\:agent pgterms\\:name').text());
		// //console.log("$('pgterms\\:agent pgterms\\:name') = " + $('pgterms\\:agent pgterms\\:name').text());
		// $('pgterms\\:agent pgterms\\:name').each(function (elm) {
			// console.log("in each, elm = " + elm);
		// });
		
		$('dcterms\\:subject rdf\\:Description rdf\\:value').each(function (index, elm) {
			console.log("in each, elm = " + $(elm).text());
		});
		
		 $('[rdf\\:resource$="/LCSH"]').each(function (index, elm) {
			console.log("in 2nd each, elm = " + $(elm).text());
		 });
		
		// console.log("subjects = " + $('dcterms\\:subject rdf\\:Description rdf\\:value').text());
		
		// console.log('author mapped = ' + $('marcrel\\:trl pgterms\\:agent pgterms\\:name').map(collect));
		
		callback(null, {
			_id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
			title: $('dcterms\\:title').text(),
			authors: $('pgterms\\:agent pgterms\\:name').map(collect),
			// authors: $('marcrel\\:trl pgterms\\:agent pgterms\\:name').map(collect).get().join(' '),
			subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect)
			//subjects: $('dcterms\\:subject rdf\\:Description rdf\\:value').map(collect)
		});		
	});
};