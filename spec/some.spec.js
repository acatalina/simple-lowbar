/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

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