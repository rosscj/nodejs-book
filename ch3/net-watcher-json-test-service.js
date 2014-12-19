'use strict';
const
	net = require('net'),
	server = net.createServer(function(connection) {
		console.log('Subsriber connected');
		
		// send the first chunk immediately
		connection.write(
			'{"type":"changed", "file":"targ'
		);
		
		// after a one second delay, send the other chunk
		let timer = setTimeout(function() {
			connection.write('et.text","timestamp":1359175758495}' + "\n");
			connection.end();
		}, 1000);
		
		//clear timer when connection ends
		connection.on('end', function() {
			clearTimeout(timer);
			console.log('Subscriber disconnected');
		});
	
	});
	
server.listen(5433, function() {
	console.log('Test server listening for subscribers...');
});