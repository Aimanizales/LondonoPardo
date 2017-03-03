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
var phone = angular.module('phone', ['ngResource']);

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

phone.factory('Phone', ['$resource', function($resource){
  return $resource('data/:phoneId.json', {}, {
    query: {
      method: 'GET',
      params: {phoneId: 'phones'},
      isArray: true
    }
  });
}]);

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