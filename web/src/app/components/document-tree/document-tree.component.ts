import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';

interface DocumentNode {
  name: string;
  children?: DocumentNode[];
}

const TREE_DATA: DocumentNode[] = [
  {
    name: 'Characters',
    children: [
      { name: 'Cassia' },
      { name: 'Zanirith' },
      { name: 'Paul' },
      { name: 'Ando' },
      { name: 'Lo' },
    ],
  },
  {
    name: 'Regions',
    children: [
      {
        name: 'Satori',
        children: [{ name: 'Kategawa' }, { name: 'Sookan' }],
      },
      {
        name: 'Lessia',
        children: [{ name: 'Lubeck' }, { name: 'Boldon' }],
      },
    ],
  },
];

@Component({
  selector: 'app-document-tree',
  templateUrl: './document-tree.component.html',
  styleUrls: ['./document-tree.component.scss'],
})
export class DocumentTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<DocumentNode>((node) => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: DocumentNode) =>
    !!node.children && node.children.length > 0;

  constructor() {}

  ngOnInit(): void {}
}
