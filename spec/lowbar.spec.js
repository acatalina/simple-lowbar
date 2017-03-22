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

