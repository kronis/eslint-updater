var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var parser = require('../src/parser.js');
var Html = require('./html.js');
var cheerio = require('cheerio');

chai.use(sinonChai);

describe('Parser', function() {
	describe('Html', function() {
		it('should get html from small html', function() {
			var html = Html.getSmallHtml();
			$ = cheerio.load(html);
			assert.equal($('html').length, 1);
			assert.equal($('body').length, 1);
		});

		it('should get html from larger html', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			assert.equal($('html').length, 1);
			assert.equal($('body').length, 1);
			assert.equal($('h2').length, 3);
			assert.equal($('ul').length, 3);
			assert.equal($('li').length, 12);
		});

		it('should not parse undefined html', function() {
			var result = parser.parseHtml(undefined);
			assert.equal(result, undefined);
		});

		it('should parse valid from html and get empty array of valid rules', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var result = parser.parseHtml(html);
			expect(result).to.have.property('validRules');
			expect(result.validRules).to.be.instanceof(Array);
			expect(result.validRules).to.have.length(0);
		});
		it('should parse valid from html', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var result = parser.parseHtml(html, ['possible-errors']);
			expect(result).to.have.property('validRules');
			expect(result.validRules).to.be.instanceof(Array);
			expect(result).to.have.deep.property('validRules[0].id');
			expect(result).to.have.deep.property('validRules[0].header');
			expect(result).to.have.deep.property('validRules[0].description');
			expect(result).to.have.deep.property('validRules[0].rules').that.is.an('array');
		});

		it('should parse valid rules obj from html, id check', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables'];
			var result = parser.parseHtml(html, validIds);
			expect(result.validRules).to.have.length(3);
			expect(result).to.have.deep.property('validRules[0].id', 'possible-errors');
			expect(result).to.have.deep.property('validRules[1].id', 'best-practices');
			expect(result).to.have.deep.property('validRules[2].id', 'variables');
		});

		it('should parse valid rules obj from html, id check with none valid id', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables', 'none-valid'];
			var result = parser.parseHtml(html, validIds);
			expect(result.validRules).to.have.length(3);
			expect(result).to.have.deep.property('validRules[0].id', 'possible-errors');
			expect(result).to.have.deep.property('validRules[1].id', 'best-practices');
			expect(result).to.have.deep.property('validRules[2].id', 'variables');
		});

		it('should parse valid rules obj from html, header check', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables', 'none-valid'];
			var result = parser.parseHtml(html, validIds);
			expect(result.validRules).to.have.length(3);
			expect(result).to.have.deep.property('validRules[0].header', 'Possible Errors');
			expect(result).to.have.deep.property('validRules[1].header', 'Best Practices');
			expect(result).to.have.deep.property('validRules[2].header', 'Variables');
		});

		it('should parse valid rules obj from html, description check', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables', 'none-valid'];
			var result = parser.parseHtml(html, validIds);
			expect(result.validRules).to.have.length(3);
			expect(result).to.have.deep.property('validRules[0].description', 'The following rules point out areas where you might have made mistakes.');
			expect(result).to.have.deep.property('validRules[1].description', 'These are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.');
			expect(result).to.have.deep.property('validRules[2].description', 'These rules have to do with variable declarations.');
		});

		it('should parse valid rules obj from html, rules check', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables', 'none-valid'];
			var result = parser.parseHtml(html, validIds);
			expect(result.validRules).to.have.length(3);
			expect(result.validRules[0].rules).to.be.instanceof(Array);
			expect(result.validRules[1].rules).to.be.instanceof(Array);
			expect(result.validRules[2].rules).to.be.instanceof(Array);
			expect(result.validRules[0].rules).to.have.length(5);
			expect(result.validRules[1].rules).to.have.length(4);
			expect(result.validRules[2].rules).to.have.length(3);
		});

		it('should parse valid rules obj from html, rules deep check', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables', 'none-valid'];
			var result = parser.parseHtml(html, validIds);
			expect(result).to.have.deep.property('validRules[0].rules[0].rule');
			expect(result).to.have.deep.property('validRules[0].rules[0].description');
			expect(result).to.have.deep.property('validRules[0].rules[0].isRecommended');
			expect(result).to.have.deep.property('validRules[0].rules[0].isFixable');
		});

		it('should parse valid rules obj from html, rules deep check values', function() {
			var html = Html.getFullHtml();
			$ = cheerio.load(html);
			var validIds = ['possible-errors', 'best-practices', 'variables', 'none-valid'];
			var result = parser.parseHtml(html, validIds);
			expect(result).to.have.deep.property('validRules[0].rules[0].rule', 'comma-dangle');
			expect(result).to.have.deep.property('validRules[0].rules[0].description', 'disallow or enforce trailing commas');
			expect(result).to.have.deep.property('validRules[0].rules[0].isRecommended', true);
			expect(result).to.have.deep.property('validRules[0].rules[0].isFixable', false);
		});
	});

	describe('.eslint file', function() {
	
		it('should be true', function() {
			expect()
		});
	});
});

