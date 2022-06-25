import { Overlay } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { Document } from 'src/app/models/Document';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
// @ts-ignore
import Delta from 'quill-delta';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss'],
})
export class DocumentPageComponent {
  @ViewChild('editor') editor: any;

  content: string = '';
  documents: Document[] = [];

  menuTopLeftPosition = { x: '0', y: '0' };
  @ViewChild(MatMenuTrigger, { static: true })
  matMenuTrigger!: MatMenuTrigger;

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
      ['link', 'image', 'video'], // link and image, video
    ],
    blotFormatter: {},
  };

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.documentsService
        .getDocumentById(params.loreId, params.documentId)
        .subscribe((res) => {
          this.content = res.content;
        });
    });
    const loreId = this.location.path().split('/')[2];
    console.log('lcoation path', loreId);
    this.documentsService.getDocumentsFromLore(loreId).subscribe((res) => {
      this.documents = res;
    });
  }

  contentChanged(obj: any) {
    const documentId = this.router.url.split('/')[4];
    let change = obj.content;

    this.documentsService
      .updateDocument(documentId, JSON.stringify(change))
      .subscribe((res) => {});
  }

  getSelection() {
    var selection = this.editor.quillEditor.getSelection();
    var selectedContent = this.editor.quillEditor.getContents(
      selection.index,
      selection.length
    );
    console.log('selection', selection);
    console.log('selectedContent', selectedContent);
    var tempContainer = document.createElement('div');
    var tempQuill = new Quill(tempContainer);
    tempQuill.setContents(selectedContent);
    this.openDialog(selection);
  }

  openDialog(selection: any): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Add a reference',
        dialogSubmit: 'Create reference',
        selectData: this.documents,
        selectHeader: 'Select document',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addReference(result.selection._id, selection);
    });
  }

  addReference(refId: string, selection: any) {
    const loreId = this.router.url.split('/')[2];
    const referenceLink = `lore-collection/${loreId}/documents/${refId}`;
    let editorContent = this.editor.quillEditor.getContents();

    console.log(referenceLink);
    console.log('editor contents', editorContent);

    this.editor.quillEditor.updateContents(
      new Delta()
        .retain(selection.index)
        .retain(selection.length, { link: referenceLink })
    );

    console.log('updatE?', this.editor.quillEditor.getContents());
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    if (this.editor.quillEditor.getSelection().length > 0)
      this.matMenuTrigger.openMenu();
  }
}
