/// <reference path='../../../_all.ts' />

namespace app.mailchimp {

    export interface IListResponseResourceDataListItem {
        name?: string;
        id?: string;
        date_created?: string;
        [key: string]: any;
    }

    export interface IListResponseResourceData {
        count: number;
        lists: IListResponseResourceDataListItem[];
    }

    export interface IListResponse {
        method?: string;
        path?: string;
        resource_data?: IListResponseResourceData;
        status?: string;
        resource?: string;
    }

    export interface IListResponseRef extends ng.resource.IResource<IListResponse> {}
    export interface IListResponseResource extends ng.resource.IResourceClass<IListResponseRef> {}

}