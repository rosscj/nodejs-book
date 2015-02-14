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
				// console.log('in collect, returning ' + $(elem).text());
				return $(elem).text();
			};
			
		// example of logging each element in collection
		// $('pgterms\\:agent pgterms\\:name').each(function(index, elm) {
			// console.log("subject - " + $(elm).text());
		// });

		
		callback(null, {
			_id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
			title: $('dcterms\\:title').text(),
			authors: $('pgterms\\:agent pgterms\\:name').map(collect).toArray(),
			//subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect) // original, but siblings and/or ends with not working...
			subjects: $('dcterms\\:subject rdf\\:description rdf\\:value').map(collect).toArray()
		});		
	});
};