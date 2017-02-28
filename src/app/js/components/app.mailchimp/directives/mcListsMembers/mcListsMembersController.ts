/// <reference path='../../../../_all.ts' />

namespace app.mailchimp {

    angular
        .module('app.mailchimp')
        .directive('mcListsMembers', () => {
            return {
                scope: true,
                restrict: 'AE',
                bindToController: {
                    listId: '=listid'
                },
                controller: [
                    '$scope',
                    'app.mailchimp.MembersRefService',
                    McListsMembersController
                ],
                controllerAs: 'membersController',
                templateUrl: 'js/components/app.mailchimp/directives/mcListsMembers/mcListsMembersView.html',
                link: ($scope: ng.IScope, element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, controller: McListsMembersController) => {
                    controller.fetch();
                }
            }
        });

    export class McListsMembersController {

        public mcMembers: IListResponseResourceDataListItem[];
        public error: string;
        public listId: string;

        constructor(private $scope, private membersRefService: IMembersRefService) {
            // Don't do anything - bind on link
        }

        public fetch(): void {
            if (!this.listId || this.listId.length == 0) {
                this.error = 'Could not load members list: unable to bind member controller to list details';
                return;
            }

            this.membersRefService
                .getMembers(this.listId)
                .then((response: any) => {
                console.log(response);
                    if (!response.data.resource_data || response.data.resource_data.count == 0) {
                        this.error = 'This list doesn\'t have members';
                        return;
                    }

                    this.mcMembers = response.data.resource_data.members;
                })
                .catch((reason: any) => {
                    this.error = 'Couldn\'t load members list for reason: ' + reason;
                });
        }

    }

}