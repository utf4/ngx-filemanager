import { Injectable, Inject, OnInit } from "@angular/core";
import { environment } from '../../../environments/environment';
import { CustomHttp } from './services/custom-http';

@Injectable()
export class FileManagerConfiguration {

    public isMultiSelection: boolean = false;

    public fileTypesFilter: Array<any> = [
        {
            name: 'ALL',
            mimes: [],
            iconCls: 'fa fa-file-o',
            text: 'All files',
            defaultSelected: true
        },
        {
            name: 'IMAGES',
            mimes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/png'],
            iconCls: 'fa fa-picture-o',
            text: 'Images'
        },
        {
            name: 'AUDIO',
            mimes: ['audio/mpeg', 'audio/x-ms-wma', 'audio/vnd.rn-realaudio', 'audio/x-wav', 'audio/mp3'],
            iconCls: 'fa fa-file-audio-o',
            text: 'Audio'
        },
        {
            name: 'VIDEO',
            mimes: ['video/mpeg', 'video/mp4', 'video/quicktime', 'video/x-ms-wmv'],
            iconCls: 'fa fa-file-video-o',
            text: 'Video'
        },
        {
            name: 'ARCHIVE',
            mimes: ['application/zip'],
            iconCls: 'fa fa-file-archive-o',
            text: 'Archive'
        }
    ];

    public fileUrl: string = '/api/files';
    public folderUrl: string = '/api/folder';

    constructor( @Inject('fileManagerUrls') urls, private _http: CustomHttp) {

        this.fileUrl = urls.filesUrl;
        this.folderUrl = urls.foldersUrl;

    }

    getFolders() {
        return this._http.get(this.folderUrl);
    }
}
