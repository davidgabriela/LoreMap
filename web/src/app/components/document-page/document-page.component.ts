import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { filter, fromEvent, Subscription, take } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents/documents.service';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss'],
})
export class DocumentPageComponent {
  @ViewChild('editor') editor: any;

  @ViewChild('userMenu') userMenu: TemplateRef<any> | undefined;
  closeEventSub: Subscription | undefined;
  overlayRef: OverlayRef | null = null;

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
    private route: ActivatedRoute,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
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

  // Opens the context menu
  open({ x, y }: MouseEvent) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu!, this.viewContainerRef, {
        // Here you can execute code based on what was right clicked
        // You will need to pass that as a param to the enclosing method
      })
    );

    // Add event to close context menu on click outside
    this.closeEventSub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  // Close context menu
  public close() {
    this.closeEventSub && this.closeEventSub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  selectionChanged(event: any) {
    if (event.range) {
      if (event.range.length) {
        console.log('selection changed');
        console.log(event);
      }
    }
  }

  getSelection() {
    var selection = this.editor.quillEditor.getSelection();
    var selectedContent = this.editor.quillEditor.getContents(
      selection.index,
      selection.length
    );
    var tempContainer = document.createElement('div');
    var tempQuill = new Quill(tempContainer);
    tempQuill.setContents(selectedContent);
    console.log(tempContainer.querySelector('.ql-editor')!.innerHTML);
  }

  menuTopLeftPosition = { x: '0', y: '0' };

  // reference to the MatMenuTrigger in the DOM
  @ViewChild(MatMenuTrigger, { static: true })
  matMenuTrigger!: MatMenuTrigger;

  /**
   * Method called when the user click with the right button
   * @param event MouseEvent, it contains the coordinates
   * @param item Our data contained in the row of the table
   */
  onRightClick(event: MouseEvent) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    // we open the menu
    // we pass to the menu the information about our object
    //this.matMenuTrigger.menuData = { item: item };

    // we open the menu
    this.matMenuTrigger.openMenu();
  }
}
