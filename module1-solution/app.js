(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchInput = '';
  $scope.calcLunch = function() {
    var items = $scope.lunchInput.split(',');
    var cnt = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.trim()) cnt++;
    }

    if (cnt == 0) {
      $scope.message = "Please enter data first";
    } else if (cnt <= 3) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }
  };
}

})();
