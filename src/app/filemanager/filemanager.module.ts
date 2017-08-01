import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileManagerConfiguration } from './filemanager/filemanager.service'
import { CustomHttp } from './filemanager/services/custom-http';
import { TreeModule } from 'angular-tree-component';
import {
  MdInputModule,
  MdIconModule,
  MdToolbarModule,
  MdButtonModule,
  MdCheckboxModule,
  MdProgressSpinnerModule,
  MdSidenavModule,
  MdCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from 'ng2-file-upload';

import { FilemanagerComponent } from './filemanager/filemanager.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BrowserAnimationsModule,
    TreeModule,
    FileUploadModule,

    MdInputModule,
    MdIconModule,
    MdToolbarModule,
    MdButtonModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    MdSidenavModule,
    MdCardModule,
    FlexLayoutModule
  ],
  exports: [
    FilemanagerComponent
  ],
  declarations: [FilemanagerComponent],
  providers: [
    FileManagerConfiguration,
    {
      provide: CustomHttp,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class FileManagerModule { }

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new CustomHttp(backend, defaultOptions);
}
