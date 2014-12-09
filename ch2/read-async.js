// most/all 'fs' methods havee an async version and don't use callbacks, instead they use sync operations (like 'standard' code)
// method names are the same, just with 'Sync' at the end
const
	fs = require('fs'),
	data = fs.readFileSync('target.txt');
process.stdout.write(data.toString());
