/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_.reduce', function() {
  it('is a function', function() {
    expect(_.reduce).to.be.a('function');
  });

  it('handles invalid inputs returning undefined', function() {
    expect(_.reduce()).to.eql(undefined);
    expect(_.reduce(1)).to.eql(undefined);
    expect(_.reduce(NaN)).to.eql(undefined);
  });

  it('iterates through every element', function() {
    let spy = sinon.spy();
    _.reduce([1, 2, 3], spy);
    expect(spy.callCount).to.eql(3);

    spy = sinon.spy();
    _.reduce({1: 1, 2: 1, 3: 1}, spy);
    expect(spy.callCount).to.eql(3);
  });
  
  it('returns the modified value according to the iteratee given', function() {
    let iteratee = function(acc, n) { 
      acc.push(n + 2); 
      return acc; 
    };

    let actual = _.reduce([1, 2, 3], iteratee, []);
    let expected = [3, 4, 5];
    expect(actual).to.eql(expected);
    
    iteratee = function(acc, n) { 
      acc[n] = 1; 
      return acc; 
    };
    
    actual = _.reduce([1, 2, 3], iteratee, {});
    expected = {
      1: 1, 
      2: 1, 
      3: 1
    };
    expect(actual).to.eql(expected);
  });

  it('binds the iteratee to the context given', function() {
    let spy = sinon.spy();
    _.reduce([1, 2, 3], spy, 0, [2, 3, 4]);
    expect(spy.thisValues[0]).to.eql([2, 3, 4]);
  });
});