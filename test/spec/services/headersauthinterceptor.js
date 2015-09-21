'use strict';

describe('Service: headersAuthInterceptor', function () {

  // load the service's module
  beforeEach(module('projectmgrApp'));

  // instantiate service
  var headersAuthInterceptor;
  beforeEach(inject(function (_headersAuthInterceptor_) {
    headersAuthInterceptor = _headersAuthInterceptor_;
  }));

  it('should do something', function () {
    expect(!!headersAuthInterceptor).toBe(true);
  });

});
