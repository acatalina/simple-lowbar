/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function() {
  'use strict';

  it('is an object', function() {
    expect(_).to.be.an('object');
  });
});
