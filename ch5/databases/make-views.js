#!/usr/bin/env node --harmony
'use strict';
const
	async = require('async'),
	request = require('request'),
	views = require('./lib/views.js');
	
async.waterfall([  // waterfall executes a sequence of async functions, takes array of functions to execute sequentially and function to call when everything is finished
	// get the existing design doc (if present)
	function(next) { // next callback is passed into each function in waterfall's array of functions in order to pass results to the next function
		request.get('http://localhost:5984/books/_design/books', next);
	},
	
	// create a new design doc or use existing
	function(res, body, next) {
		if (res.statusCode === 200) {
			next(null, JSON.parse(body));
		} else if (res.statusCode === 404) {
			next(null, {views: {} });
		}
	},

	// add views to document and submit
	function(doc, next) {
		Object.keys(views).forEach(function(name) {
			doc.views[name] = views[name];
		});
		request({
			method: 'PUT',
			url: 'http://localhost:5984/books/_design/books',
			json: doc
		}, next);
	}	
], function(err, res, body) {
	if (err) { throw err; }
	console.log(res.statusCode, body);
});