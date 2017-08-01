import { Injectable, Inject, OnInit } from "@angular/core";
import { environment } from '../../../environments/environment';
import { CustomHttp } from './services/custom-http';

@Injectable()
export class FileManagerConfiguration {

    public fileUrl: string = '/api/files';
    public folderUrl: string = '/api/folder';
    public baseUrl: string = '/trees';
    public fileUploadUrl = '/upload';


    constructor( @Inject('fileManagerUrls') urls, private _http: CustomHttp) {

        this.fileUrl = urls.filesUrl;
        this.folderUrl = urls.foldersUrl;
        this.fileUploadUrl = urls.fileUploadUrl;

    }

    getFileUploadUrl() {
        return this.fileUploadUrl;
    }

    getFolders() {
        return this._http.get(this.folderUrl);
    }

    getBaseTree() {
        return this._http.get(this.baseUrl);
    }
}
