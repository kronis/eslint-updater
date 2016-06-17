function printResultsForFile(result) {
	console.log('Results for ' + result.fileName);
	if (result && result.missingRules) {
		console.log('Missing rules:');
		result.missingRules.forEach(function(rule) {
			console.log(rule);
		});
	} 
	if (result && result.deletedRules) {
		console.log('Deleted rules:');
		result.deletedRules.forEach(function(rule) {
			console.log(rule);
		});
	} 
	if (result 
			&& (!result.missingRules || result.missingRules.length === 0) 
			&& (!result.deletedRules || result.deletedRules.length === 0) 
	   ) {
		console.log('File is up to date');
	}
}

var printer = {
	print: function(results) {
		if (!results) {
			return;
		}

		if (Array.isArray(results)) {
			results.forEach(function(result) {
				printResultsForFile(result);
			});
		} else {
			printResultsForFile(results);
		}
	}
};

module.exports = printer;
