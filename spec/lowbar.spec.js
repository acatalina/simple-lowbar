/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
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

  describe('#uniq', function() {
    it('is a function', function() {
      expect(_.uniq).to.be.a('function');
    });

    it('returns an empty array when no arguments passed or it is not an array', function() {
      expect(_.uniq(true)).to.eql([]);
      expect(_.uniq({name: 'foo'})).to.eql([]);
    });

    it('returns an array of unique elements and respects the order', function() {
      let actual = _.uniq([1, 1, 2]);
      let expected = [1, 2];
      expect(actual).to.eql(expected);
      actual = _.uniq([1, 1, 2, 5, 2, 2, 3, 4, 5, 5]);
      expected = [1, 2, 5, 3, 4];
      expect(actual).to.eql(expected);
    });

    it('accepts a isSorted value to run a quicker algorithm', function() {
      let actual = _.uniq([1, 1, 2, 2, 2, 2, 3, 4, 5, 5], true);
      let expected = [1, 2, 3, 4, 5];
      expect(actual).to.eql(expected);
    });

    it('does a unique search based on an iteratee given', function() {
      let input = [
        { name: 'bar', text: 'test text' },
        { name: 'foo', text: 'did it work?' },
        { name: 'bar', text: 'did it work? 2' },
        { name: 'foo', text: 'did it work? 3' },
        { name: 'bar', text: 'did it work? 4' },
        { name: 'foo', text: 'did it work? 4' },
        { name: 'bar', text: 'did it work? 5' },
        { name: 'foo', text: 'did it work? 6' },
      ];
      let actual= _.uniq(input, false, ((e) => { return e.name }));
      let expected = [ { name: 'bar', text: 'test text' },
        { name: 'foo', text: 'did it work?' } ]

      expect(actual).to.eql(expected);
    });
  });

  describe('#map', function() {
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

    it('returns false when all items are false', function () {
      var spy = sinon.spy(function(n) { return n > 6; })
      var expected = false;
      var actual = _.some([1, 2, 3, 4, 5], spy);
      expect(actual).to.eql(expected);
      expect(spy.callCount).to.eql(5);
    });
  });

  describe('#extend', function () {    
    it('is a function',function(){
      expect(_.extend).to.be.a('function')
    });

    it('returns the destination when no sources are provided', function(){
     expect(_.extend({'a': 1, 'b': 2})).to.eql({'a': 1, 'b': 2});   
    });

    it('copies the properties of the source object into the target object', function () {
      let actual = _.extend({}, {name: 'Sam', age: 20});
      let expected = {name: 'Sam', age: 20};
      expect(actual).to.eql(expected);
    });
    
    it('overwrites existing properties', function () {
      let actual = _.extend({name: 'Joe'}, {name: 'Sam', age: 20});
      let expected = {name: 'Sam', age: 20};
      expect(actual).to.eql(expected);
    });
    
    it('copies properties from multiple source arguments', function () {
      let actual = _.extend({name: 'Sam'}, {name: 'Joe'}, {name: 'Pepe', age: 99});
      let expected = {name: 'Pepe', age: 99};
      expect(actual).to.eql(expected);
    });
    
    it('works for arrays', function () {
      let actual = _.extend([1, 2, 3], [4, 5, 6], {name: 'Pepe'});
      let expected = [4, 5, 6];
      expected.name = 'Pepe';
      expect(actual).to.eql(expected);
    });
  });

  describe('#defaults', function () {    
    it('is a function', function() {
      expect(_.defaults).to.be.a('function');
    });

    it('returns the object if no defaults is given', function() {
      expect(_.defaults({name: 'Al'})).to.eql({name: 'Al'});
    });

    it('copies the missing properties from defaults object to object', function() {
      expect(_.defaults({name: 'Al'}, {surname: 'Catalina'})).to.eql({name: 'Al', surname: 'Catalina'});
    });

    it('does not overwrites properties from default object on object', function() {
      expect(_.defaults({name: 'Al', surname: 'Catalina'}, {surname: 'Martin'})).to.eql({name: 'Al', surname: 'Catalina'});
    });
  });
});

