/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_.identity', function() {
  it('is a function', function() {
    expect(_.identity).to.be.a('function');
  });

  it('returns the same passed arguments or undefined if no arguments given', function() {
    let expected = [1, 2, 3];
    let actual = _.identity(expected);
    expect(actual).to.equal(expected);
    
    actual = _.identity();
    expected = undefined;
    expect(actual).to.eql(expected);
  });
});