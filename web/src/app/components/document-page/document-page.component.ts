import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { DocumentsService } from 'src/app/services/documents/documents.service';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss'],
})
export class DocumentPageComponent {
  @ViewChild('editor') editor: any;
  content: string = '';

  modules = {
    toolbar: [
      ['bold', 'italic', 'strike'], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'], // remove formatting button
      ['link', 'image'], // link and image, video
    ],
    blotFormatter: {},
  };

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  blurred = false;
  focused = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.documentsService
        .getDocumentById(params.loreId, params.documentId)
        .subscribe((res) => {
          this.content = res.content;
        });
    });
  }

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    // console.log('DOC PAGE ROUTE: ', this.router.url);
    // const loreId = this.router.url.split('/')[2];
    // const documentId = this.router.url.split('/')[4];
    // this.documentsService
    //   .getDocumentById(loreId, documentId)
    //   .subscribe((res) => {
    //     this.content = res.content;
    //   });
  }

  contentChanged(obj: any) {
    const documentId = this.router.url.split('/')[4];
    let change = obj.content;

    this.documentsService
      .updateDocument(documentId, JSON.stringify(change))
      .subscribe((res) => {
        console.log('Updated document');
        //this.pageContent = obj.html
      });
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blurred = false;
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }
}
