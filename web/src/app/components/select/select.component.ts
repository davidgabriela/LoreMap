import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() selectHeader: string = '';
  @Input() selectLabel: string = '';
  @Input() selectItems: any = [];

  selectedItem: string = '';

  emitItem(event: MatSelectChange) {
    console.log('changed', event);
    this.newItemEvent.emit(event.value);
  }

  constructor() {}

  ngOnInit(): void {}
}
