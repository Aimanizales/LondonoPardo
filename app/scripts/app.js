'use strict';

//init modules:
var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phoneList', 
  'phoneDetail',
  'LocalStorageModule'
]);
var homeModule = angular.module('homeModule', []);
var phoneList = angular.module('phoneList', []);
var phoneDetail = angular.module('phoneDetail', []);
var phone = angular.module('phone', ['ngResource']);


phonecatApp.config(function(localStorageServiceProvider){
  localStorageServiceProvider
    .setPrefix('lp')
    .setStorageType('localStorage');
})

//init routes:
phonecatApp.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html'
      }).
      when('/como-comprar', {
        templateUrl: 'partials/contact.html'
      }).
      when('/para-mujer', {
        template: '<phone-list></phone-list>'
      }).
      when('/para-hombre', {
        template: '<phone-list></phone-list>'
      }).
      when('/para-hombre/:phoneId', {
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

phonecatApp.controller('HeaderController', ['$scope', '$location', 'localStorageService', function ($scope, $location, localStorageService) {
  $scope.items = localStorageService.get('items') || 0;
  //console.log('this.items ===', $scope.items);
  /*$scope.$watch('hola2', function(value){
    localStorageService.set('hola2',value);
    $scope.localStorageDemoValue = localStorageService.get('hola2');
  });*/

  //$scope.storageType = 'Local storage';

  if (localStorageService.getStorageType().indexOf('session') >= 0) {
    $scope.storageType = 'Session storage';
  }
  if (!localStorageService.isSupported) {
    $scope.storageType = 'Cookie';
  }

  /*$scope.$watch(function(){
    return localStorageService.get(lsItem);
  }, function(value){
    $scope.localStorageDemo = value;
  });*/

  $scope.clearAll = localStorageService.clearAll;

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
}]);

phone.factory('Phone', ['$resource', function($resource){
  return $resource('data/:phoneId.json', {}, {
    query: {
      method: 'GET',
      params: {phoneId: 'phones'},
      isArray: true
    }
  });
}]);

phoneList.component('phoneList', {
    templateUrl: 'partials/phone-list.template.html',
    controller: ['$http', '$location', 
      function PhoneListController($http, $location) {
        var self = this;
        self.orderProp = 'id';
        self.gender = ($location.path().indexOf('hombre') > 0) ? 'hombre': 'mujer';
        self.sizes = {
          'hombre': '28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42',
          'mujer': '6, 8, 10, 12, 14'
        }
        self.productsPath = 'data/jeans-' + self.gender + '.json';
        
        $http.get(self.productsPath).then(function(response) {
          self.phones = response.data;
        });
      }
    ]
  }
);

phoneDetail.component('phoneDetail',{
    templateUrl: 'partials/phone-detail.template.html',
    controller: ['$routeParams', 
    //'Phone', 
      function PhoneDetailController($routeParams /*, Phone*/){
        var self = this;
        //phoneId = $routeParams.phoneId;
       /* self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
          self.setImage(phone.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };*/
      }
    ]
});
/*
describe('Phone', function() {
  var $httpBackend;
  var Phone;
  var phonesData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Phone` service before each test
  beforeEach(module('core.phone'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Phone_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/phones.json').respond(phonesData);
    Phone = _Phone_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from `/phones/phones.json`', function() {
    var phones = Phone.query();

    expect(phones).toEqual([]);

    $httpBackend.flush();
    expect(phones).toEqual(phonesData);
  });
});*/