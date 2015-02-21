#!/usr/bin/env node --harmony
'use strict';
const
	express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	redisClient = require('redis').createClient(),
	// RedisStore = require('connect-redis')(express),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	app = express();

// app.use(logger);
// app.use(express.cookieParser());
app.use(cookieParser());
app.use(session({
// app.use(express.session({
	secret: 'unguessable',
	store: new RedisStore({
		client: redisClient
	})
}));

app.get('/api/:name', function(req, res) {
	res.json(200, { "hello": req.params.name });
});
app.listen(3000, function() {
	console.log("ready captain.");
});