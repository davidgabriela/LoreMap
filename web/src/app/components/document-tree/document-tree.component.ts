import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Folder } from 'src/app/models/Folder';
import { FoldersService } from 'src/app/services/folders/folders.service';
import { Document } from '../../models/Document';

@Component({
  selector: 'app-document-tree',
  templateUrl: './document-tree.component.html',
  styleUrls: ['./document-tree.component.scss'],
})
export class DocumentTreeComponent implements OnInit {
  @Input() documents: Document[] = [];
  folders: Observable<Folder[]> = new Observable<Folder[]>();

  treeControl = new NestedTreeControl<Folder>((node) => node.children);
  dataSource: ArrayDataSource<Folder> | null = null;

  hasChild = (_: number, node: Folder) => !!node.children;

  constructor(
    private foldersService: FoldersService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const loreId = this.location.path().split('/')[2];
    this.folders = this.foldersService.getFoldersFromLore(loreId);
    this.folders.subscribe(() => {});
  }

  deleteDocument() {}
}
