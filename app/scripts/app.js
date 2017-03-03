'use strict';

//init modules:
var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phoneList', 
  'phoneDetail'
]);
var homeModule = angular.module('homeModule', []);
var phoneList = angular.module('phoneList', []);
var phoneDetail = angular.module('phoneDetail', []);

//init routes:
phonecatApp.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html'
      }).
      when('/phones', {
        template: '<phone-list></phone-list>'
      }).
      when('/phones/:phoneId', {
        template: '<phone-detail></phone-detail>'
      }).
      when('/mis-compras', {
        templateUrl: 'partials/shopping-cart.html'
      }).
      otherwise('/', {
        templateUrl: 'partials/home.html'
      });
  }
]);

//init components:
phoneList.component('phoneList', {
    templateUrl: 'partials/phone-list.template.html',
    controller: function PhoneListController($http) {
      //El controller define la lógica y data requerida para soportar una vista en ese scope.
      var self = this;
      self.orderProp = 'age';

      $http.get('data/phones.json').then(function(response) {
        self.phones = response.data;
      });
    }
  }
);

phoneDetail.component('phoneDetail',{
    templateUrl: 'partials/phone-detail.template.html',
    controller: ['$routeParams',
      function PhoneDetailController($routeParams){
        //var self = this;
        phoneId = $routeParams.phoneId;
      }
    ]
});