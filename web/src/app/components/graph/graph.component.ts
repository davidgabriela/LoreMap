import { Component, OnInit } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public links: Edge[] = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'is parent of',
    },
    {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'custom label',
    },
    {
      id: 'c',
      source: 'first',
      target: 'fourth',
      label: 'custom label',
    },
  ];
  public nodes: Node[] = [
    {
      id: 'first',
      label: 'A',
    },
    {
      id: 'second',
      label: 'B',
    },
    {
      id: 'third',
      label: 'C',
    },
    {
      id: 'fourth',
      label: 'D',
    },
  ];
}
