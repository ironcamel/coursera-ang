(function() {
'use strict';

var app = angular.module('NarrowItDownApp', []);
app.service('MenuSearchService', MenuSearchService);
app.controller('NarrowItDownController', NarrowItDownController);
app.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var me = this;
  me.found = [];
  me.search = '';
  me.showNothingFound = false;

  me.narrow = function() {
    MenuSearchService.getMatchedMenuItems(me.search).then(function(items) {
      me.found = items;
      me.showNothingFound = me.found.length == 0;
    });
  }

  me.remove = function(index) {
    me.found.splice(index, 1);
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'found.html',
    scope: {
      found: '<',
      onRemove: '<'
    }
  };
  return ddo;
}

MenuSearchService.$inject = ['$http', '$filter', '$q'];
function MenuSearchService($http, $filter, $q) {
  var me = this;

  me.search = function(items, searchTerm) {
    return $filter('filter')(items, { name: searchTerm });
  };

  me.getMatchedMenuItems = function(searchTerm) {
    if (!searchTerm) {
      searchTerm = '';
    }
    searchTerm = searchTerm.trim();
    var defer = $q.defer();
    if (!searchTerm) {
      defer.resolve([]);
      return defer.promise;
    }
    if (me.cache) {
      defer.resolve(me.search(me.cache, searchTerm));
      return defer.promise;
    }
    var url = 'https://davids-restaurant.herokuapp.com/menu_items.json';
    return $http.get(url).then(function (result) {
        var menu_items = result.data.menu_items;
        me.cache = menu_items;
        return me.search(menu_items, searchTerm);
    });
  };
}

})();
