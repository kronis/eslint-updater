var http = require('http');
var cheerio = require('cheerio');
var minimist = require('minimist');
var fs = require('fs');
var _ = require('lodash');
var stripComments = require("strip-json-comments");

var fetcher = require('./fetcher.js');
var parser = require('./parser.js');

function createRules(rulesArray) {
	var returnArray = [];
	rulesArray.each(function(index, element) {
		returnArray.push({
			rule: $(this).find('a').text(),
			description: $(this).text().replace(/^.*- /, '').trim(),
			isRecommended: $(this).find('span.glyphicon-ok').length > 0,
			isFiXable: $(this).find('span.glyphicon-wrench').length > 0
		});
	});
	return returnArray;
}

function createRulesSet(header, text, rules) {
	return {
		header: header.text(),
		description: text.text(),
		rules: createRules(rules)
	}
}

function createJsonFromHtml(html) {
	$ = cheerio.load(html);
	var ids = ['possible-errors', 'best-practices', 'strict-mode', 'variables', 'nodejs-and-commonjs', 'stylistic-issues', 'ecmascript-6'];
	var removedIds = ['removed'];

	var rulesArrayValid = [];
	ids.forEach(function(id) {
		var header = $('#' + id);
		var text = $('#' + id).next();
		var rules = $('#' + id).next().next().children();
		rulesArrayValid.push(createRulesSet(header, text, rules));
	});
	var rulesArrayInvalid = [];
	removedIds.forEach(function(id) {
		var header = $('#' + id);
		var text = $('#' + id).next();
		var rules = $('#' + id).next().next().children();
		rulesArrayInvalid.push(createRulesSet(header, text, rules));
	});
	return {
		valid: rulesArrayValid,
		invalid: rulesArrayInvalid
	};

}

function readFiles(uris) {
	return uris.map(function(path) {
		var content = JSON.parse(stripComments(fs.readFileSync(path, 'utf8')));
		var obj = {};
		obj[path] = content.rules;
		return obj;
	});
}

function getRulesOnline(json) {
	var rulesArray = _.map(json, 'rules');
	return _.chain(rulesArray).map(function(rules) {
		var rules = _.map(rules, 'rule');
		return rules;
	}).flatten().value();
}

function checkFile(file, activeRulesOnlineValid, activeRulesOnlineInvalid) {
	var fileName = _.chain(file).keys().head().value();
	var fileRules = _.keys(file[fileName]);
	var stats = {
		missingRules: _.difference(activeRulesOnlineValid, fileRules),
		invalidRules: _.intersection(activeRulesOnlineInvalid, fileRules)
	};
	console.log(stats);

}

function checkFiles(files, activeRulesOnlineValid, activeRulesOnlineInvalid) {
	files.forEach(function(file, index) {
		checkFile(file, activeRulesOnlineValid, activeRulesOnlineInvalid);
	});
}

function parseHtml(html) {
	var argv = minimist(process.argv.slice(2));
	var files = argv._;

	var jsonFiles = readFiles(files);
	var jsonOnline = parser.parseHtml(html);
	// var jsonOnline = createJsonFromHtml(html);

	var rulesOnlineValid = getRulesOnline(jsonOnline.valid);
	var rulesOnlineInvalid= getRulesOnline(jsonOnline.invalid);

	checkFiles(jsonFiles, rulesOnlineValid, rulesOnlineInvalid);
}

var options = {
	host: 'eslint.org',
	path: '/docs/rules/'
};

callback = function(response) {
	parseHtml(response);
}

fetcher.get(options, callback);
// http.request(options, callback).end();

