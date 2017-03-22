/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));
 
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