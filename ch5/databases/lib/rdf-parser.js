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
				console.log('hit collect with elem text = ' + $(elem).text());
				return $(elem).text();
			};
		
		console.log('pgterms\\:marc260 = ' + $('pgterms\\:marc260').text());
		// console.log("$('marcrel\\trl pgterms\\:agent pgterms\\:name') = " + $('marcrel\\:trl pgterms\\:agent pgterms\\:name').text());
		console.log("$('pgterms\\:agent pgterms\\:name') = " + $('pgterms\\:agent pgterms\\:name').text());
		$('pgterms\\:agent pgterms\\:name').each(function (elm) {
			console.log("in each, elm = " + elm);
		});
		
		console.log('author mapped = ' + $('marcrel\\:trl pgterms\\:agent pgterms\\:name').map(collect));
		
		callback(null, {
			_id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
			title: $('dcterms\\:title').text(),
			authors: $('marcrel\\:trl pgterms\\:agent pgterms\\:name').map(collect),
			subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect)
		});		
	});
};