var app = angular.module('restaApp', ['ngRoute']);

app.controller('homeCtrl', ['$scope', 'restas', function($scope, restas) {
    $scope.checking = 'I am working';
    restas.get()
    .success(function(data) {
        $scope.data = data;
    });
}]);

app.controller('detailCtrl', ['$scope', function($scope) {
    $scope.detail = 'Detail page';
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/detail', {
            templateUrl: 'detail.html',
            controller: 'detailCtrl'
        })
        $locationProvider.html5Mode(true);
}]);

app.factory('restas', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/lists');
        }
    };
}])
