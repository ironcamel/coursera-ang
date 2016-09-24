(function() {
'use strict';

var app = angular.module('ShoppingListCheckOff', []);
app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
app.controller('ToBuyShoppingController', ToBuyShoppingController);
app.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  this.items = ShoppingListCheckOffService.toBuy;
  this.buy = function(index) {
    ShoppingListCheckOffService.buy(index);
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  this.items = ShoppingListCheckOffService.bought;
}

function ShoppingListCheckOffService() {
  this.toBuy = [
    { name: "cookies", quantity: 10 },
    { name: "bananas", quantity: 20 },
    { name: "cucumbers", quantity: 30 },
    { name: "apples", quantity: 40 },
    { name: "oranges", quantity: 50 },
  ];
  this.bought = [];

  this.buy = function(index) {
    this.bought.push( this.toBuy.splice(index, 1)[0] );
  };
}

})();
