var app = angular.module('restaApp', ['ngRoute']);

app.controller('homeCtrl', ['$scope', 'restas', function($scope, restas) {
    restas.get()
        .success(function(data) {
            $scope.data = data;
        });
}]);

app.controller('detailCtrl', ['$scope', '$routeParams', 'restas', function($scope, $routeParams, restas) {
    var refresh = function() {
        restas.getOne($routeParams.id)
            .success(function(data) {
                $scope.detail = data;
            });
    };

    // refresh now
    refresh();

    $scope.createReview = function() {
        // Just in case
        // Let's second-validate
        if ($scope.formData != undefined) { // if no formData object
            if (!$scope.formData.email) { // email is compulsory
                Materialize.toast('Come oo-oo--ooonn, add your email', 5000);
                return;
            }
            // add datestamp on the fly
            $scope.formData.createdAt = new Date();

            // console.log(angular.toJson($scope.formData));

            // create review
            restas.createReview(angular.toJson($scope.formData), $routeParams.id)
                .success(function(data) {
                    $scope.formData = {}; // clear the form
                    Materialize.toast('Success', 5000); // success message
                    refresh(); // reload added review
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
