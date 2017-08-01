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
    { provide: 'fileManagerUrls', useValue: { foldersUrl: '/folders', filesUrl: '/files', treeUrl: '/trees', fileUploadUrl: '/upload' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
