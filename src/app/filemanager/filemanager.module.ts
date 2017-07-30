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
  MdProgressSpinnerModule
} from '@angular/material';
import { FilemanagerComponent } from './filemanager/filemanager.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BrowserAnimationsModule,
    TreeModule,

    MdInputModule,
    MdIconModule,
    MdToolbarModule,
    MdButtonModule,
    MdCheckboxModule,
    MdProgressSpinnerModule
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
