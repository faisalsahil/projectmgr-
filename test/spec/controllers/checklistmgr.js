'use strict';

describe('Controller: ChecklistmgrCtrl', function () {

  // load the controller's module
  beforeEach(module('projectmgrApp'));

  var ChecklistmgrCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChecklistmgrCtrl = $controller('ChecklistmgrCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
