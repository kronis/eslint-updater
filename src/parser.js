var _ = require('lodash');

function createRules(rules) {
	return _.map(rules, function(rule) {
		return {
			rule: $(rule).find('a').text(),
			description: $(rule).text().replace(/^.*- /, '').trim(),
			isRecommended: $(rule).find('span.glyphicon-ok').length > 0,
			isFixable: $(rule).find('span.glyphicon-wrench').length > 0
		};
	});
}

function createSection(html, id) {
	var header = $('#' + id);
	if (header.length === 0) {
		return;
	}

	var description = $('#' + id).next();
	var rules = $('#' + id).next().next().children();
	return {
		id: id,
		header: $(header).text(),
		description: $(description).text(),
		rules: createRules(rules)
	};
}

var parser = {
	parseHtml: function(html, validIds) {
		if (!html) {
			return;
		}

		var returnObj = {
			validRules: []
		};

		if (validIds) {
			validIds.forEach(function(id) {
				var rule = createSection(html, id);
				if (rule) {
					returnObj.validRules.push(rule);
				}
			});
		}

		return returnObj;
	}
};

module.exports = parser;
