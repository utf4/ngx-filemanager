import { Component, OnInit } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { FileManagerConfiguration } from './filemanager.service';

@Component({
  selector: 'filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements OnInit {

  nodes1 = [
    {
      title: 'Images',
      className: 'root1Class'
    },
    {
      title: 'Videos',
      className: 'root2Class',
      hasChildren: true
    }
  ];

  nodes2 = [
    {
      title: 'Images',
      className: 'root1Class'
    },
    {
      title: 'Videos',
      className: 'root2Class',
      children: [
        { title: 'My Videos', className: 'child1Class' },
        { title: 'Movies', className: 'child1Class' }

      ]
    }
  ];

  nodesReal = [];

  options1: ITreeOptions = {
    getChildren: () => new Promise((resolve, reject) => { })
  };

  options0: ITreeOptions = {
    displayField: 'title',
    nodeClass: (node) => `${node.data.title}Class`
  };

  constructor(private fileManagerService: FileManagerConfiguration) { }

  ngOnInit() {
    this.fileManagerService.getFolders().subscribe(data => {
      this.nodesReal = data.json();
    })
  }

}
