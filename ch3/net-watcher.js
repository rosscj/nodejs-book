'use strict';
const
	fs = require('fs'),
	net = require('net'),
	filename = process.argv[2],
	server = net.createServer(function(connection) {
		// reporting
		console.log('Subscriber connected.');
		connection.write("Now watching '" + filename + "' for changes ...\n");
		
		// watcher setup
		let watcher = fs.watch(filename, function() {
			connection.write("File '" + filename + "' changed: " + Date.now() + "\n");
		});
		
		//cleanup
		connection.on('close', function() {
			console.log('Subscriber disconnected.');
			watcher.close();
		});
	});
	
if (!filename) {
	throw Error('No target filename was specified.');
}

server.listen(5433, function() {
	console.log('Listening for subscribers...');
});

// to see in action, open 2nd git bash, and type 'telnet localhost 5433'
// note: may have to install telnet in 'Turn Windows features on or off'
// then use 3rd git bash to run 'touch target.txt', or just edit target.txt