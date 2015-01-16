'use strict';
const
	cluster = require('cluster'),
	zmq = require('zmq');
	//pusher = zmq.socket('push'),
	// puller = zmq.socket('pull');
	
// connect to the pusher, announce readiness to work, then wait for work....
puller.on('message', function(data) {
	let job = JSON.parse(data.toString());
	//
});
	
let 
	pusher = zmq.socket('push').bind('tcp://127.0.0.1:5433'),
	puller = zmq.socket('pull').bind('tcp://127.0.0.1:5444');  // bound to different tcp port since ipc not supported on windows
	
	
for (let i = 0; i < 30; i++) {
	pusher.send(JSON.stringify({
		details: 'job details',
		pid: process.pid
	});
}

