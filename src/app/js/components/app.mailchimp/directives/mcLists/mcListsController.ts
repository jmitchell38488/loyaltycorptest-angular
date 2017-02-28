/// <reference path='../../../../_all.ts' />

namespace app.mailchimp {

    angular
        .module('app.mailchimp')
        .directive('mcLists', () => {
            return {
                restrict: 'AE',
                controller: [
                    '$scope',
                    'app.mailchimp.ListRefService',
                    McListsController
                ],
                controllerAs: 'listController',
                templateUrl: 'js/components/app.mailchimp/directives/mcLists/mcListsView.html'
            }
        });

    export class McListsController {

        public mcList: IListResponseResourceDataListItem[];
        public error: string;

        constructor(private $scope, private listRefService: IListRefService) {
            this.fetch();
        }

        public fetch(): void {
            this.listRefService
                .getLists()
                .then((response: any) => {
                    if (!response.data.resource_data || response.data.resource_data.count == 0) {
                        this.error = 'Couldn\'t load for reason: no data returned, you need to add a list first, or check your API settings';
                        return;
                    }

                    this.mcList = response.data.resource_data.lists;
                })
                .catch((reason: any) => {
                    this.error = 'Couldn\'t load for reason: ' + reason;
                });
        }

    }

}