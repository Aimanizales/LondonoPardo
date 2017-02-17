var phoneCatApp = angular.module('phonecatApp', []);

phoneCatApp.controller('PhoneListController', function PhoneListController($scope){
  $scope.phones = [
    {
      name:'Nexus S',
      snippet: 'adflkg dfkjg dfañkg dfñlkg dfjlñ'
    },
    {
      name:'Moto X',
      snippet: 'adflkg dfkjg dfañkg dfñlkg dfjlñ'
    },
    {
      name:'iPhone',
      snippet: 'adflkg dfkjg dfañkg dfñlkg dfjlñ'
    }
  ];
});