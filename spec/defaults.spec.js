/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('#defaults', function() {    
  it('is a function', function() {
    expect(_.defaults).to.be.a('function');
  });

  it('returns the object if no defaults is given', function() {
    expect(_.defaults({name: 'Al'})).to.eql({name: 'Al'});
  });

  it('copies the missing properties from defaults object to object', function() {
    expect(_.defaults({name: 'Al'}, {surname: 'Catalina'})).to.eql({name: 'Al', surname: 'Catalina'});
  });

  it('does not overwrites properties from default object on object', function() {
    expect(_.defaults({name: 'Al', surname: 'Catalina'}, {surname: 'Martin'})).to.eql({name: 'Al', surname: 'Catalina'});
  });
});
