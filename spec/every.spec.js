/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));
  
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