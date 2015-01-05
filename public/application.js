var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName
    , ["ngRoute","example"]);
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

mainApplicationModule.config(['$locationProvider',function($locationProvider){
    $locationProvider.hashPrefix('!');
}]);