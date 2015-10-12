//CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
    
}]);

weatherApp.controller('forecastController', ['$scope','cityService','$resource','$routeParams', function($scope, cityService, $resource, $routeParams){
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    //console.log($resource);
    
   $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
//    
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
    
    $scope.convertToFarenheit = function(degK) {
        
        return Math.round((1.8 * (degK - 273) + 32));
        
    };
    
    $scope.convertToDate = function(date) {
        
        return new Date(date * 1000);
    }
//    
    //console.log($scope.weatherResult);
    
}]);