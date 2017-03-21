const path = require('path');
var expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar.js'));
var range = require('underscore').range;

describe('_.indexOf', function () {
  it('is a function', function () {
    expect(_.indexOf).to.be.a('function');
  });
  
  it('returns index value from an two elements array', function () {
    let actual = _.indexOf([1, 2, 3], 1);
    let expected = 0;
    expect(actual).to.be.equal(expected);
  });

  it('returns -1 when value is not found', function () {
    let actual = _.indexOf([1, 2, 3], 4);
    let expected = -1;
    expect(actual).to.be.equal(expected);
  });
  
  it('returns index value on a larger array', function () {
    let actual = _.indexOf([1, 2, 4, 5, 6, 7, 8, 9, 4, 3, 1, 2, 2, 3], 4);
    let expected = 2;
    expect(actual).to.be.equal(expected);
  });

  it('performs a quicker search if true as third argument is given', function () {
    let data = range(1000000);
    let start, end, selectionTime, binaryTime;
    start = Date.now();
    _.indexOf(data, 999999);
    end = Date.now();
    selectionTime = end - start;

    start = Date.now();
    _.indexOf(data, 999999, true);
    end = Date.now();
    binaryTime = end - start;
    
    expect(binaryTime).to.be.lessThan(selectionTime);
  });

  it('returns index value on a larger array from index given as third argument', function () {
    let actual = _.indexOf([1, 2, 4, 5, 6, 7, 8, 9, 4, 3, 1, 2, 2, 3], 4, 11);
    let expected = -1;
    expect(actual).to.be.equal(expected);
    actual = _.indexOf([1, 2, 4, 5, 6, 7, 8, 9, 4, 3, 1, 2, 2, 3], 4, 3);
    expected = 8;
    expect(actual).to.be.equal(expected);
  });
});
