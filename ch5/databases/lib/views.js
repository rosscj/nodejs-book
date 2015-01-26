module.exports = {
	by_author: {
		map: function(doc) {
			if ('authors' in doc {
				doc.authors.forEach(emit);
			}
		}.toString(), // have to do toString to store in CouchDB, it only accepts json docs, not true functions
		reduce: '_count' // this is CouchDB's built in _count function
	},
	
	by_subject: {
		map: function(doc) {
			if ('subjects' in doc) {
				doc.subjects.forEach(function(subject) {
					emit(subject, subject);
					
					subject.split(/\s+--\s+/).forEach(function(part) {
						emit(part, subject);
					});
				});
			}
		}.toString(),
		reduce: '_count'
	}
};
