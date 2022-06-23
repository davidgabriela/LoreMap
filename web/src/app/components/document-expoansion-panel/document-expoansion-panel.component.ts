import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from '../../models/Document';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-document-expoansion-panel',
  templateUrl: './document-expoansion-panel.component.html',
  styleUrls: ['./document-expoansion-panel.component.scss'],
})
export class DocumentExpoansionPanelComponent {
  loreId: string = '';

  panelOpenState = false;
  documents: Document[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private documentsService: DocumentsService,
    private location: Location
  ) {
    console.log('location:', location.path());
  }

  ngOnInit(): void {
    console.log('location:', this.location.path());
    const loreId = this.location.path().split('/')[2];
    this.documentsService.getDocumentsFromLore(loreId).subscribe((res) => {
      console.log('Get documents: ', res);
      this.documents = res;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {
        dialogTitle: 'Enter a name for your new document',
        dialogLabel: 'Enter name',
        dialogSubmit: 'Add new document',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const loreId = this.router.url.split('/')[2];
      if (result) {
        const document = {
          name: result,
          content: '',
          lore: loreId,
        };
        this.documentsService.createDocument(document).subscribe((res) => {
          console.log('Added doc', res);
        });
      }
    });
  }
}
