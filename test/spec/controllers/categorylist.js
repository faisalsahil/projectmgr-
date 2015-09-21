'use strict';

describe('Controller: CategorylistCtrl', function () {

  // load the controller's module
  beforeEach(module('projectmgrApp'));

  var CategorylistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategorylistCtrl = $controller('CategorylistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
