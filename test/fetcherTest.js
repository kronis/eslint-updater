var cheerio = require('cheerio');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var fetcher = require('../src/fetcher.js');
var PassThrough = require('stream').PassThrough;
var http = require('http');
var assert = require('assert');
var Html = require('./html.js');

chai.use(sinonChai);

describe('Fetcher', function() {
	beforeEach(function() {
		this.request = sinon.stub(http, 'request');
	});

	afterEach(function() {
		http.request.restore();
	});

	it('should get some html', function(done) {
		var response = new PassThrough();
		var html = Html.getSmallHtml();
		response.write(html);
		response.end();
		var request = new PassThrough();
		this.request.callsArgWith(1, response).returns(request);

		fetcher.get({}, function(err, result) {
			$ = cheerio.load(result);
			assert.equal($('html').length, 1);
			assert.equal($('body').length, 1);
			done();
		});
	});
});

