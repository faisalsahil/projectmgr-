'use strict';

describe('Controller: IncidentreportCtrl', function () {

  // load the controller's module
  beforeEach(module('projectmgrApp'));

  var IncidentreportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IncidentreportCtrl = $controller('IncidentreportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
