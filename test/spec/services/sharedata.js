'use strict';

describe('Service: sharedata', function () {

  // load the service's module
  beforeEach(module('projectmgrApp'));

  // instantiate service
  var sharedata;
  beforeEach(inject(function (_sharedata_) {
    sharedata = _sharedata_;
  }));

  it('should do something', function () {
    expect(!!sharedata).toBe(true);
  });

});
