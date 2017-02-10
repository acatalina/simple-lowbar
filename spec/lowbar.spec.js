/* global describe, it */
var path = require('path');
var expect = require('chai').expect;
var sinon = require('sinon');

var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('#identity', function () {
    it('is a function', function() {
      expect(_.identity).to.be.a('function');
    });

    it('return arguments or undefined', function () {
      var actual = _.identity([1, 2, 3]);
      var expected = [1, 2, 3];
      expect(actual).to.eql(expected);
      actual = _.identity();
      expected = undefined;
      expect(actual).to.eql(expected);
    });
  });

  describe('#first', function () {
    it('is a function', function() {
      expect(_.first).to.be.a('function');
    });

    it('return the first element of an array', function () {
      var actual = _.first([1, 2, 3]);
      var expected = 1;
      expect(actual).to.eql(expected);
      actual = _.first([2, 3, 4]);
      expected = 2;
      expect(actual).to.eql(expected);
    });
  
    it('return the first n elements of an array', function () {
      var actual = _.first([1, 2, 3], 2);
      var expected = [1, 2];
      expect(actual).to.eql(expected);
      actual = _.first([2, 3, 4, 5], 3);
      expected = [2, 3, 4];
      expect(actual).to.eql(expected);
    });
  });


  describe('#last', function () {
    it('is a function', function() {
      expect(_.last).to.be.a('function');
    });

    it('return the last element of an array', function () {
      var actual = _.last([1, 2, 3]);
      var expected = 3;
      expect(actual).to.eql(expected);
      actual = _.last([2, 3, 4]);
      expected = 4;
      expect(actual).to.eql(expected);
    });
  
    it('return the last n elements of an array', function () {
      var actual = _.last([1, 2, 3], 2);
      var expected = [2, 3];
      expect(actual).to.eql(expected);
      actual = _.last([2, 3, 4, 5], 3);
      expected = [3, 4, 5];
      expect(actual).to.eql(expected);
    });
  });

  describe('#each', function () {    
    it('is a function', function() {
      expect(_.each).to.be.a('function');
    });

    it('returns the list given', function () {
      var expected = [1, 2, 3];
      var actual = _.each(expected, function(){});
      expect(actual).to.eql(expected);
    });
  
    it('calls the iteratee for each element of the list', function() {
      var spy = sinon.spy();
      var arr = [1, 2, 3];
      _.each(arr, spy);
      expect(spy.callCount).to.equal(3);
    });
  });

  describe('#indexOf', function () {
    it('is a function', function() {
      expect(_.indexOf).to.be.a('function');
    });

    it('returns the index of n given', function () {
      var actual = _.indexOf([1, 2, 3], 2);
      var expected = 1;
      expect(actual).to.eql(expected);
    });

    it('returns -1 if not found', function () {
      var actual = _.indexOf([1, 2, 3], 4);
      var expected = -1;
      expect(actual).to.eql(expected);
    });
  });

  describe('#filter', function () {
    it('is a function', function() {
      expect(_.filter).to.be.a('function');
    });

    it('checks every element on a list', function () {
      var spy = sinon.spy();
      _.filter([1, 2, 3], spy);
      expect(spy.callCount).to.eql(3);
      _.filter({1: 1, 2: 2, 3: 3}, spy);
      expect(spy.callCount).to.eql(6);
    });

    it('returns a filtered list', function () {
      var spy = function(n) { return n < 3; };
      var filter = _.filter([1, 2, 3], spy);
      expect(filter).to.eql([1, 2]);
      filter = _.filter({one: 1, two: 2, three: 3}, spy);
      expect(filter).to.eql([1, 2]);
    });
  });

describe('#reject', function () {
    it('is a function', function() {
      expect(_.reject).to.be.a('function');
    });

    it('checks every element on a list', function () {
      var spy = sinon.spy();
      _.reject([1, 2, 3], spy);
      expect(spy.callCount).to.eql(3);
      _.reject({1: 1, 2: 2, 3: 3}, spy);
      expect(spy.callCount).to.eql(6);
    });

    it('returns a rejected list', function () {
      var spy = function(n) { return n < 3; };
      var reject = _.reject([1, 2, 3], spy);
      expect(reject).to.eql([3]);
      reject = _.reject({1: 1, 2: 2, 3: 3}, spy);
      expect(reject).to.eql([3]);
    });
  });

  describe('#map', function () {
    it('is a function', function() {
      expect(_.map).to.be.a('function');
    });

    it('checks every element on a list', function () {
      var spy = sinon.spy();
      _.map([1, 2, 3], spy);
      expect(spy.callCount).to.eql(3);
      _.map({1: 1, 2: 2, 3: 3}, spy);
      expect(spy.callCount).to.eql(6);
    });

    it('returns a mapped list', function () {
      var spy = function(n) { return n + 1; };
      var map = _.map([1, 2, 3], spy);
      expect(map).to.eql([2, 3, 4]);
      map = _.map({one: 1, two: 2, three: 3}, spy);
      expect(map).to.eql([2, 3, 4]);
    });
  });

  describe('#pluck', function () {
    it('is a function', function() {
      expect(_.pluck).to.be.a('function');
    });

    it('extracts property values', function () {
      var pluck = _.pluck([{num: 1, c: 0 }, {num: 2, c: 3}, {num:3, c:1}], 'num');
      expect(pluck).to.eql([1, 2, 3]);
    });
  });

  describe('#reduce', function () {
    it('is a function', function() {
      expect(_.reduce).to.be.a('function');
    });

    it('iterate through every element', function () {
      var spy = function(acc, n) { return acc, n; };
      var reduce = _.reduce([1, 2, 3], spy, 0);
      expect(reduce).to.eql(3);
    });
    
    it('returns what is ask to do', function () {
      var spy = function(acc, n) { acc.push(n + 2) ; return acc; };
      var reduce = _.reduce([1, 2, 3], spy, []);
      expect(reduce).to.eql([3, 4, 5]);
      spy = function(acc, n) { acc[n] = 1 ; return acc; };
      reduce = _.reduce([1, 2, 3], spy, {});
      expect(reduce).to.eql({1: 1, 2: 1, 3: 1});
    });
  });

  describe('#contains', function () {    
    it('is a function', function() {
      expect(_.contains).to.be.a('function');
    });

    it('returns false when item is not found', function () {
      var expected = false;
      var actual = _.contains([1, 2, 3], 4);
      expect(actual).to.eql(expected);
    });

    it('returns true when item is not found', function () {
      var expected = true;
      var actual = _.contains([1, 2, 3], 3);
      expect(actual).to.eql(expected);
    });

    it('it uses fromIndex value', function () {
      var expected = false;
      var actual = _.contains([1, 2, 3], 1, 1);
      expect(actual).to.eql(expected);
    });
  });


  describe('#every', function () {    
    it('is a function', function() {
      expect(_.every).to.be.a('function');
    });

    it('returns false and stops counting if one value does not pass the criteria', function () {
      var spy = sinon.spy(function(n) { return n < 3; })
      var expected = false;
      var actual = _.every([1, 2, 3, 4, 5], spy);
      expect(actual).to.eql(expected);
      expect(spy.callCount).to.eql(3);
    });

    it('returns true when all items are true', function () {
      var spy = sinon.spy(function(n) { return n < 6; })
      var expected = true;
      var actual = _.every([1, 2, 3, 4, 5], spy);
      expect(actual).to.eql(expected);
      expect(spy.callCount).to.eql(5);
    });
  });

  describe('#some', function () {    
    it('is a function', function() {
      expect(_.some).to.be.a('function');
    });

    it('returns true and stops counting if at least one value pass the criteria', function () {
      var spy = sinon.spy(function(n) { return n < 3; })
      var expected = true;
      var actual = _.some([1, 2, 3, 4, 5], spy);
      expect(actual).to.eql(expected);
      expect(spy.callCount).to.eql(1);
      actual = _.some({n: 1, b: 2, c: 2}, spy);
      expect(actual).to.eql(expected);
      expect(spy.callCount).to.eql(2);
    });

    xit('returns true when all items are true', function () {
      var spy = sinon.spy(function(n) { return n < 6; })
      var expected = true;
      var actual = _.every([1, 2, 3, 4, 5], spy);
      expect(actual).to.eql(expected);
      expect(spy.callCount).to.eql(5);
    });
  });


});

