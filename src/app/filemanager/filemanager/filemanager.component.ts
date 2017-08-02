import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FileManagerConfiguration } from './filemanager.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
// const URL = '/api/';
@Component({
  selector: 'filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements OnInit {

  fileUploadUrl = '';
  files: Array<any> = [];
  public uploader: FileUploader;
  public loading: boolean = false;


  constructor(
    private fileManagerService: FileManagerConfiguration,
    @Inject('fileManagerUrls') urls
  ) {
    this.uploader = new FileUploader({
      url: urls.fileUploadUrl
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onBeforeUploadItem = () => {
      this.loading = true;
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.getFiles();
    };
  }

  ngOnInit() {
    this.getFiles();
  }
  getFiles() {
    this.loading = true;
    this.fileManagerService.getFiles().subscribe(files => {
      this.loading = false;
      this.files = files.json().files;
    })
  }

}
