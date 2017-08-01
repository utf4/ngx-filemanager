import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeComponent } from 'angular-tree-component';
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

  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  fileUploadUrl = '';
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;


  constructor(private fileManagerService: FileManagerConfiguration, @Inject('fileManagerUrls') urls) {
    this.uploader = new FileUploader({ url: environment.apiUrl + urls.fileUploadUrl });
  }
  ngOnInit() {
    this.fileManagerService.getBaseTree().subscribe(data => {
      let temp = data.json();
      this.nodes = temp.children;
      this.activeDirectory = temp.path;
    })
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  nodes: Array<any>;
  activeDirectory: string;

  options: ITreeOptions = {
    displayField: 'name',
    nodeClass: (node) => `${node.data.name}Class`,
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          if (node.data.type !== 'directory') {
            this.activeDirectory = node.data.path.substring(0, node.data.path.lastIndexOf('/'));
          } else {
            this.activeDirectory = node.data.path;
          }
        }
      }
    },
    nodeHeight: 23,
    allowDrag: (node) => {
      return true;
    },
    allowDrop: (node) => {
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  };

  addNode() {
    this.nodes.push({ name: 'another node' });
    this.tree.treeModel.update();
  }

  onEvent(ev) {
    console.log(ev)
  }




}
