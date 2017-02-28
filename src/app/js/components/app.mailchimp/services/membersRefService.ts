/// <reference path='../../../_all.ts' />

namespace app.mailchimp {

    export interface IMembersRefService {
        getMembers(listid: string): angular.IPromise<any>;
        getMember(listid: string, memberid: string): angular.IPromise<any>;
    }

    export interface IMembersRefServiceResponse {
        [key: string]: any;
    }

    export class MembersRefService implements IMembersRefService {

        private listAllUri: string = 'http://localhost:8001/api/lists/{listid}/members';
        private listDetailsUri: string = 'http://localhost:8001/api/lists/{listid}/members{memberid}';

        constructor(private $http: angular.IHttpService, private $q: angular.IQService) {}

        public getMembers(listid: string): angular.IPromise<any> {
            return this.$http.get(
                this.listAllUri
                    .replace('{listid}', listid)
            );
        }

        public getMember(listid: string, memberid: string): angular.IPromise<any> {
            return this.$http.get(
                this.listDetailsUri
                    .replace('{listid}', listid)
                    .replace('{memberid}', memberid)
            );
        }

    }

}