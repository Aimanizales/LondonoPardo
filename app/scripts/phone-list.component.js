angular.
  module('phonecatApp').
  component('phoneList', {
    templateUrl: 'partials/phone-list.template.html',
    controller: function PhoneListController($http) {
      var self = this;
      self.orderProp = 'age';

      $http.get('data/phones.json').then(function(response) {
        self.phones = response.data;
      });
    }
  });