/// <reference path='../../_all.ts' />

namespace app.mailchimp {

    angular.module('app.mailchimp').service('app.mailchimp.ListRefService', [
        '$http', '$q',
        ($http, $q) => new app.mailchimp.ListRefService($http, $q)
    ]);

}