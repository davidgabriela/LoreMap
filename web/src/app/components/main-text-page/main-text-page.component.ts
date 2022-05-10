import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'app-main-text-page',
  templateUrl: './main-text-page.component.html',
  styleUrls: ['./main-text-page.component.scss']
})
export class MainTextPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  blurred = false
  focused = false

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blurred = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blurred = true
  }

}
