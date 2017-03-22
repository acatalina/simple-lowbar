/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));
 
describe('_.contains', function() {    
  it('is a function', function() {
    expect(_.contains).to.be.a('function');
  });

  it('returns false when invalid inputs are given', function() {
    expect(_.contains()).to.equal(false);
    expect(_.contains(1)).to.equal(false);
    expect(_.contains(NaN)).to.equal(false);
  });

  it('returns false when item is not found', function() {
    let expected = false;
    let actual = _.contains([1, 2, 3], 4);
    expect(actual).to.eql(expected);

    expected = false;
    actual = _.contains({1: 2, 3: 4}, 1);
    expect(actual).to.eql(expected);
  });

  it('returns true when item is found', function() {
    let expected = true;
    let actual = _.contains([1, 2, 3], 3);
    expect(actual).to.eql(expected);
    
    expected = true;
    actual = _.contains({1: 2, 3: 4}, 2);
    expect(actual).to.eql(expected);    
  });

  it('allows a fromIndex value for arrays', function() {
    let expected = false;
    let actual = _.contains([1, 2, 3], 1, 1);
    expect(actual).to.eql(expected);

    expected = true;
    actual = _.contains([1, 2, 3], 1, 0);
    expect(actual).to.eql(expected);
  });
});