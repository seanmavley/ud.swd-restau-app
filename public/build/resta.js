// initializers for Materialize CSS
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
// Note: Best practice requires Controllers, Routes and Services etc
// have separate files. However, I combined them all here for simplicity

angular.module('restaApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
  }])
  .controller('homeCtrl', ['$scope', 'restas', function($scope, restas) {
    // anyway to persist limitStep
    // across routes?
    var limitStep = 10;
    $scope.limit = limitStep;
    $scope.showMore = function() {
      $scope.limit += limitStep;
    };

    restas.get()
      .success(function(data) {
        $scope.data = data;
      });
  }])
  .controller('detailCtrl', ['$scope', '$routeParams', 'restas', function($scope, $routeParams, restas) {
    var refresh = function() {
      restas.getOne($routeParams.id)
        .success(function(data) {
          $scope.detail = data;
        });
    };

    // refresh on detailCtrl load
    refresh();

    $scope.createReview = function() {
      // Let's validate
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
            Materialize.toast('Added review successfully', 5000); // success message
            refresh(); // reload added review
          });
      } else {
        Materialize.toast('Something is wrong! You know what, complete the damn review!', 5000);
      }
    };
  }])
  .factory('restas', ['$http', function($http) {
    return {
      // just one endpoint for all
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
