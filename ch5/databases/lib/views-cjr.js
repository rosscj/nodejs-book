module.exports = {
	"all": {
		"map": "function(doc) { if (doc.title)  emit(null, doc) }"
	},
	all_authors: {
		map: function(doc) {
			if (doc._id && doc.title) {
				emit(doc._id, doc.title);
			}
		}.toString()
	}
};
