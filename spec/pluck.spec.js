/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_.pluck', function () {
  it('is a function', function() {
    expect(_.pluck).to.be.a('function');
  });

  it('extracts property values', function () {
    var pluck = _.pluck([{num: 1, c: 0 }, {num: 2, c: 3}, {num:3, c:1}], 'num');
    expect(pluck).to.eql([1, 2, 3]);
  });
});
