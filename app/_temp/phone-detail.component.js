angular.module('phoneDetail').
  component('phoneDetail',{
    template: '<p>Detail bla bla bla</p>',
    controller: ['$routeParams',
      function PhoneDetailController($routeParams){
        this.phoneId = $routeParams.phoneId;
      }
    ]
});