var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var printer = require('../src/printer.js');

chai.use(sinonChai);

describe('Printer', function() {
	beforeEach(function() {
		sinon.spy(console, 'log');
	});

	afterEach(function() {
		console.log.restore();
	});

	it('should not print to console', function() {
		printer.print();
		expect(console.log).not.to.be.called;
	});

	it('should print missing rule to console', function() {
		var results = {
			missingRules: ['rule1']
		};
		printer.print(results);
		expect(console.log.calledWith('Missing rules:')).to.be.true;
		expect(console.log.calledWith('rule1')).to.be.true;
	});

	it('should print missing rules to console', function() {
		var results = {
			missingRules: ['rule1', 'rule2']
		};
		printer.print(results);
		expect(console.log.calledWith('Missing rules:')).to.be.true;
		expect(console.log.calledWith('rule1')).to.be.true;
		expect(console.log.calledWith('rule2')).to.be.true;
	});
	
	it('should print deleted rule to console', function() {
		var results = {
			deletedRules: ['rule3']
		};
		printer.print(results);
		expect(console.log.calledWith('Deleted rules:')).to.be.true;
		expect(console.log.calledWith('rule3')).to.be.true;
	});

	it('should print deleted rules to console', function() {
		var results = {
			deletedRules: ['rule3', 'rule4']
		};
		printer.print(results);
		expect(console.log.calledWith('Deleted rules:')).to.be.true;
		expect(console.log.calledWith('rule3')).to.be.true;
		expect(console.log.calledWith('rule4')).to.be.true;
	});

	it('should print file is up to date', function() {
		var results = {
		};
		printer.print(results);
		expect(console.log.calledWith('File is up to date')).to.be.true;
	});

	it('should print filename', function() {
		var results = {
			fileName: '.eslint'
		};
		printer.print(results);
		expect(console.log.calledWith('Results for .eslint')).to.be.true;
	});

	it('should print result for multiple files', function() {
		var results = [{
			fileName: '.eslint1',
			missingRules: ['missing1', 'missing2'],
			deletedRules: ['deleted1', 'deleted2']
		}, {
			fileName: '.eslint2',
			missingRules: ['missing3', 'missing4'],
			deletedRules: ['deleted3', 'deleted4']
		}];
		printer.print(results);
		expect(console.log.calledWith('Results for .eslint1')).to.be.true;
		expect(console.log.calledWith('Results for .eslint2')).to.be.true;
		expect(console.log.calledWith('missing1')).to.be.true;
		expect(console.log.calledWith('missing2')).to.be.true;
		expect(console.log.calledWith('missing3')).to.be.true;
		expect(console.log.calledWith('missing4')).to.be.true;
		expect(console.log.calledWith('deleted1')).to.be.true;
		expect(console.log.calledWith('deleted2')).to.be.true;
		expect(console.log.calledWith('deleted3')).to.be.true;
		expect(console.log.calledWith('deleted4')).to.be.true;
	});

});

