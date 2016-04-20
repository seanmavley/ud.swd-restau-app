$(document).ready(function() {
    $('select').material_select();

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false // Displays dropdown below the button
    }
  );
    $('.modal-trigger').leanModal();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('ul.tabs').tabs();
});
var app = angular.module('restaApp', ['ngRoute']);

app.controller('homeCtrl', ['$scope', 'restas', function($scope, restas) {
    $scope.checking = 'I am working';
    restas.get()
        .success(function(data) {
            $scope.data = data;
        });
}]);

app.controller('detailCtrl', ['$scope', '$routeParams', 'restas', function($scope, $routeParams, restas) {
    restas.getOne($routeParams.id)
        .success(function(data) {
            $scope.detail = data;
        })

    $scope.createReview = function() {
        // Evil guy, I'm looking at you...
        // Let's second-validate
        if ($scope.formData != undefined) {
            if (!$scope.formData.email) { // email is compulsory
                Materialize.toast('Come oo-oo--ooonn, add your email', 5000);
                return;
            } 
            // add datestamp on the fly
            $scope.formData.createdAt = new Date(); 

            // what am I getting from form?
            // console.log(angular.toJson($scope.formData));

            // create review
            restas.createReview(angular.toJson($scope.formData), $routeParams.id)
                .success(function(data) {
                    $scope.formData = {}; // clear the form
                    Materialize.toast('Success', 5000);
                });
        } else {
            Materialize.toast('Something is wrong! You know what, complete the damn review!', 5000);
        }
    };
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/detail/:id', {
            templateUrl: 'detail.html',
            controller: 'detailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
        // $locationProvider.html5Mode(true);
}]);

app.factory('restas', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/lists');
        },
        getOne: function(id) {
            return $http.get('/api/lists/' + id);
        },
        createReview: function(formData, id) {
            return $http.post('/api/lists/' + id, formData);
        },
    };
}])
