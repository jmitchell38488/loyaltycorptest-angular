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
                templateUrl: 'js/components/app.mailchimp/directives/mcListsDetails/mcListsDetailsView.html',
                link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, controller: McListsDetailsController) => {
                    controller.fetch();
                }
            }
        });

    export class McListsDetailsController {

        public mcDetails: any;
        public error: string;
        public listId: string;

        constructor(private $scope, private $routeParams, private listRefService: IListRefService) {
            this.listId = this.$routeParams.listid;
        }

        public fetch(): void {
            this.listRefService
                .getList(this.listId)
                .then((response: any) => {
                    if (!response.data.resource) {
                        this.error = 'Couldn\'t load for reason: no data returned, you need to add a list first, or check your API settings';
                        return;
                    }

                    this.mcDetails = response.data.resource;
                })
                .catch((reason: any) => {
                    this.error = 'Couldn\'t load for reason: ' + reason;
                });
        }

    }

}