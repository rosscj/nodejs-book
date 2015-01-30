module.exports = {
	"all": {
		"map": "function(doc) { if (doc.Type == 'book')  emit(null, doc) }"
	}
};
