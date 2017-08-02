import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FileManagerModule } from './filemanager/filemanager.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FileManagerModule
  ],
  providers: [
    {
      provide: 'fileManagerUrls',
      useValue: {
        foldersUrl: '/folders',
        filesUrl: '/files',
        treeUrl: '/trees',
        fileUploadUrl: 'http://13.58.181.154:4000/api/v1/files'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
