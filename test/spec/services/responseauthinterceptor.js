'use strict';

describe('Service: responseAuthInterceptor', function () {

  // load the service's module
  beforeEach(module('projectmgrApp'));

  // instantiate service
  var responseAuthInterceptor;
  beforeEach(inject(function (_responseAuthInterceptor_) {
    responseAuthInterceptor = _responseAuthInterceptor_;
  }));

  it('should do something', function () {
    expect(!!responseAuthInterceptor).toBe(true);
  });

});
