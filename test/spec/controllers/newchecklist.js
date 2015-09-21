'use strict';

describe('Controller: NewchecklistCtrl', function () {

  // load the controller's module
  beforeEach(module('projectmgrApp'));

  var NewchecklistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewchecklistCtrl = $controller('NewchecklistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
