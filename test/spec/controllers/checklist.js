'use strict';

describe('Controller: ChecklistCtrl', function () {

  // load the controller's module
  beforeEach(module('projectmgrApp'));

  var ChecklistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChecklistCtrl = $controller('ChecklistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
