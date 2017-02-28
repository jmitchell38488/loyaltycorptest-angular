/// <reference path='_all.ts' />
angular.module('app', [
    'app.flickr'
]);
/// <reference path='../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        var module = angular.module('app.flickr', [
            'ngRoute',
            'ngAnimate',
            'ngResource',
            'ngSanitize',
        ]);
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
;
/// <reference path='../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        var module = angular.module('app.flickr');
        module.service('app.flickr.PhotoListRefService', [
            '$http', '$q',
            function ($http, $q) { return new app.flickr.PhotoListRefService($http, $q); }
        ]);
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
/// <reference path='../../../_all.ts' />
/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        var module = angular.module('app.flickr');
        module.animation('.animate', function () {
            function animateIn(element, className, done) {
                if (className !== 'selected') {
                    return;
                }
                element.css({
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0
                }).animate({
                    opacity: 1
                }, 300, done);
                return function (wasCanceled) {
                    if (wasCanceled) {
                        element.stop();
                    }
                };
            }
            function animateOut(element, className, done) {
                if (className !== 'selected') {
                    return;
                }
                element.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 1
                }).animate({
                    opacity: 0
                }, 300, done);
                return function (wasCanceled) {
                    if (wasCanceled) {
                        element.stop();
                    }
                };
            }
            return {
                addClass: animateIn,
                removeClass: animateOut
            };
        });
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
/// <reference path='../../../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        angular.module('app.flickr').directive('photoSearch', function () {
            return {
                restrict: 'AE',
                controller: [
                    '$scope',
                    PhotoSearchController
                ],
                controllerAs: 'searchController',
                templateUrl: 'js/components/app.flickr/directives/photoSearch/photoSearchView.html',
                link: function ($scope, element, $attrs, controller) {
                    $scope.$watch('query', function (data) {
                        console.log('query data: ' + data);
                    });
                }
            };
        });
        var PhotoSearchController = (function () {
            function PhotoSearchController() {
            }
            return PhotoSearchController;
        }());
        flickr.PhotoSearchController = PhotoSearchController;
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
/// <reference path='../../../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        angular
            .module('app.flickr')
            .directive('photoList', function () {
            return {
                restrict: 'AE',
                controller: [
                    '$scope',
                    'app.flickr.PhotoListRefService',
                    PhotoListController
                ],
                controllerAs: 'photoController',
                templateUrl: 'js/components/app.flickr/directives/photoList/photoListView.html',
                link: function ($scope, element, $attrs, controller) {
                    $scope.$watch('query', function (query) {
                        console.log(query);
                        controller.fetch();
                    });
                }
            };
        });
        var PhotoListController = (function () {
            function PhotoListController($scope, photoSearchService) {
                this.$scope = $scope;
                this.photoSearchService = photoSearchService;
                this.fetch();
            }
            PhotoListController.prototype.fetch = function () {
                var _this = this;
                this.photoSearchService
                    .getPhotoList({ tags: this.$scope.query })
                    .then(function (data) {
                    _this.photoList = data.data.items;
                })
                    .catch(function (reason) {
                    console.log('Couldn\'t load for reason...');
                    console.log(reason);
                });
            };
            return PhotoListController;
        }());
        flickr.PhotoListController = PhotoListController;
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        var PhotoListRefService = (function () {
            function PhotoListRefService($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.searchUri = 'http://api.flickr.com/services/feeds/photos_public.gne';
            }
            PhotoListRefService.prototype.getPhotoList = function (query) {
                var config = {
                    params: {
                        format: 'json',
                        tags: query.tags,
                        tagmode: 'any',
                        jsoncallback: 'JSON_CALLBACK'
                    }
                };
                return this.$http.jsonp(this.searchUri, config);
                /*
    
                let d = this.$q.defer();
                this.$http.jsonp(this.searchUri, config)
                    .success((data) => {
                        d.resolve(data);
                    })
                    .error((data) => {
                        d.reject(data);
                    });
    
                return d.promise;
    
                */
                /*
    
                let d = this.$q.defer();
                this.$http.jsonp(uri)
                    .success((data) => {
                        d.resolve(data);
                    });
    
                return d.promise;*/
            };
            return PhotoListRefService;
        }());
        flickr.PhotoListRefService = PhotoListRefService;
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
/// <reference path='../../../_all.ts' />
var app;
(function (app) {
    var flickr;
    (function (flickr) {
        var module = angular.module('app.flickr');
        module.config([
            '$locationProvider', '$routeProvider', '$sceDelegateProvider',
            function ($locationProvider, $routeProvider, $sceDelegateProvider) {
                $locationProvider.hashPrefix('!');
                $sceDelegateProvider.resourceUrlWhitelist([
                    'self',
                    'http://api.flickr.com/**',
                    'http://*.staticflickr.com/**',
                    'http://*.flickr.com/**'
                ]);
                $routeProvider
                    .when('/', {
                    template: function () {
                        return '<photo-list></photo-list>';
                    }
                })
                    .when('/photo/:photoId', {
                    template: function () {
                        return '<photo-details></photo-details>';
                    }
                })
                    .otherwise({
                    redirectTo: '/'
                });
            }
        ]);
    })(flickr = app.flickr || (app.flickr = {}));
})(app || (app = {}));
/// <reference path='../../../typings/jquery/jquery.d.ts' />
/// <reference path='../../../typings/angularjs/angular.d.ts' />
/// <reference path='../../../typings/angularjs/angular-route.d.ts' />
/// <reference path='../../../typings/angularjs/angular-resource.d.ts' />
/// <reference path='../../../typings/angularjs/angular-animate.d.ts' />
/// <reference path='app.ts' />
/// <reference path='components/app.flickr/module.ts' />
/// <reference path='components/app.flickr/component.ts' />
/// <reference path='components/app.flickr/domain/ListModel.ts' />
/// <reference path='components/app.flickr/animations/ImageGalleryAnimation.ts' />
/// <reference path='components/app.flickr/directives/photoSearch/photoSearchController.ts' />
/// <reference path='components/app.flickr/directives/photoList/photoListController.ts' />
/// <reference path='components/app.flickr/services/photoListRefService.ts' />
/// <reference path='components/app.flickr/config/Config.ts' />
//# sourceMappingURL=application.js.map