/// <reference path='../../../_all.ts' />

namespace app.mailchimp {

    angular.module('app.mailchimp').config([
        '$locationProvider', '$routeProvider', '$sceDelegateProvider',
        ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider, $sceDelegateProvider: any) => {
            $locationProvider.hashPrefix('!');

            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'localhost:8001'
            ]);

            $routeProvider
                .when('/lists', {
                    template: () => {
                        return '<mc-lists></mc-lists>'
                    }
                })
                .when('/lists/:listid', {
                    template: () => {
                        return '<mc-lists-details></mc-lists-details>'
                    }
                })
                .when('/lists/:listid/members', {
                    template: () => {
                        return '<mc-lists-members></mc-lists-members>'
                    }
                })
                .when('/lists/:listid/members/:memberid', {
                    template: () => {
                        return '<mc-member_details></mc-member_details>'
                    }
                })
                .otherwise({
                    redirectTo: '/lists'
                });
        }
    ]);
}


