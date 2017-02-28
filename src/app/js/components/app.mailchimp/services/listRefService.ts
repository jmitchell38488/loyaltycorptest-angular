/// <reference path='../../../_all.ts' />

namespace app.mailchimp {

    export interface IListRefService {
        getLists(): angular.IPromise<IListResponseResource>;
        getList(id: string): angular.IPromise<any>;
    }

    export interface IListRefServiceResponse {
        [key: string]: any;
    }

    export class ListRefService implements IListRefService {

        private listAllUri: string = 'http://localhost:8001/api/lists';
        private listDetailsUri: string = 'http://localhost:8001/api/lists/{id}';

        constructor(private $http: angular.IHttpService, private $q: angular.IQService) {}

        public getLists(): angular.IPromise<IListResponseResource> {
            return this.$http.get(this.listAllUri);
        }

        public getList(id: string): angular.IPromise<any> {
            return this.$http.get(this.listDetailsUri.replace('{id}', id));
        }

    }

}