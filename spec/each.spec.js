/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('#each', function () {    
  it('is a function', function() {
    expect(_.each).to.be.a('function');
  });

  it('returns back whatever is given', function () {
    let expected = [1, 2, 3];
    let actual = _.each(expected, function(){});
    expect(actual).to.equal(expected);      
    expected = {1: 1};
    actual = _.each(expected, function(){});
    expect(actual).to.equal(expected);
    expected = true;
    actual = _.each(expected, function(){});
    expect(actual).to.equal(expected);
    expected = NaN;
    actual = _.each(expected, function(){});
    expect(actual).to.eql(expected);
    expected = undefined;
    actual = _.each(expected, function(){});
    expect(actual).to.eql(expected);
  });

  it('calls the iteratee for each element of the list', function() {
    let spy = sinon.spy();
    let arr = [1, 2, 3];
    _.each(arr, spy);
    expect(spy.callCount).to.equal(3);
    spy = sinon.spy();
    let obj = {1: 1, 2: 2};
    _.each(obj, spy);
    expect(spy.callCount).to.equal(2);
  });

  it('binds the iteratee to the context given', function() {
    let expected = [1];
    let contextPushed = [];
    let context = [2];
    let actual = _.each(expected, function(e){ contextPushed.push(this)}, context);
    expect(actual).to.equal(expected);
    expect(contextPushed).to.eql([[2]]);
  });
});
