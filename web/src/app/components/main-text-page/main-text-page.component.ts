import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import { Subscription } from "rxjs";
import { LoreCollectionService } from "src/app/services/lore-collection/lore-collection.service";

@Component({
  selector: 'app-main-text-page',
  templateUrl: './main-text-page.component.html',
  styleUrls: ['./main-text-page.component.scss']
})
export class MainTextPageComponent {
  @ViewChild('editor') editor: any;
  private routeSub: Subscription = new Subscription();
  private routeId: string = "";
  pageContent: string ='';

  modules = {
    toolbar: [
    ['bold', 'italic', 'strike'], // toggled buttons
    [{ 'header': 1 }, { 'header': 2 }], // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
    [{ 'direction': 'rtl' }], // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'], // remove formatting button
    ['link', 'image'], // link and image, video
    ]
  };

  constructor(private loreCollectionService: LoreCollectionService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id'])
      this.routeId = params['id']
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  blurred = false
  focused = false

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
    console.log(event);
    this.loreCollectionService.getLore(this.routeId).subscribe(res => {
      this.pageContent = res.content
    });
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    //console.log('editor-change', event)
  }

  contentChanged(obj: any) {
    console.log('content-change', obj.html, this.routeId)
    this.loreCollectionService.updateLore(this.routeId, obj.html).subscribe(respone => {
      console.log('Updated lore')
      this.pageContent = obj.html
    })
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
