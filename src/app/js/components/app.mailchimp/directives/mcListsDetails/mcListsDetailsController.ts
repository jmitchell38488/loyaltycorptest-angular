/// <reference path='../../../../_all.ts' />

namespace app.mailchimp {

    angular
        .module('app.mailchimp')
        .directive('mcListsDetails', () => {
            return {
                restrict: 'AE',
                controller: [
                    '$scope',
                    '$routeParams',
                    'app.mailchimp.ListRefService',
                    McListsDetailsController
                ],
                controllerAs: 'detailsController',
                templateUrl: 'js/components/app.mailchimp/directives/mcListsDetails/mcListsDetailsView.html'
            }
        });

    export class McListsDetailsController {

        public mcDetails: any;
        public error: string;

        constructor(private $scope, private $routeParams, private listRefService: IListRefService) {
            this.fetch();
        }

        public fetch(): void {
            this.listRefService
                .getList(this.$routeParams.listid)
                .then((response: any) => {
                    if (!response.data.resource) {
                        this.error = 'Couldn\'t load for reason: no data returned, you need to add a list first, or check your API settings';
                        return;
                    }

                    console.log(response.data.resource);

                    this.mcDetails = response.data.resource;
                })
                .catch((reason: any) => {
                    this.error = 'Couldn\'t load for reason: ' + reason;
                });
        }

    }

}