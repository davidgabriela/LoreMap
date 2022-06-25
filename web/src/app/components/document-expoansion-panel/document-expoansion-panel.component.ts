import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { FoldersService } from 'src/app/services/folders/folders.service';
import { Document } from '../../models/Document';
import { Folder } from '../../models/Folder';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-document-expoansion-panel',
  templateUrl: './document-expoansion-panel.component.html',
  styleUrls: ['./document-expoansion-panel.component.scss'],
})
export class DocumentExpoansionPanelComponent {
  loreId: string = '';
  newDocumentData: any = {
    dialogTitle: 'Enter a name for your new document',
    dialogSubmit: 'Add new document',
    selectData: [],
    selectHeader: 'Select category',
  };
  newFolderData: any = {
    dialogTitle: 'Enter a name for your new folder',
    dialogLabel: 'Enter name',
    dialogSubmit: 'Create new folder',
  };

  panelOpenState = false;
  documents: Document[] = [];
  folders: Folder[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private documentsService: DocumentsService,
    private location: Location,
    private foldersService: FoldersService
  ) {}

  ngOnInit(): void {
    const loreId = this.location.path().split('/')[2];
    this.loreId = loreId;
    this.documentsService.getDocumentsFromLore(loreId).subscribe((res) => {
      this.documents = res;
    });
    this.foldersService.getFoldersFromLore(loreId).subscribe((res) => {
      this.folders = res;
    });
  }

  openDialogDocument(): void {
    this.newDocumentData.selectData = this.folders;
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '500px',
      data: this.newDocumentData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const loreId = this.router.url.split('/')[2];
      if (result) {
        const document = {
          name: result.name,
          parent: result.selection,
          content: '',
          lore: loreId,
        };
        this.documentsService.createDocument(document).subscribe((res) => {
          console.log('Added doc', res);
        });
      }
    });
  }

  openDialogFolder(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '500px',
      data: this.newFolderData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const loreId = this.router.url.split('/')[2];
      if (result) {
        const folder = {
          name: result.name,
          lore: loreId,
        };
        this.foldersService.createFolder(folder).subscribe((res) => {
          console.log('Added folder', res);
        });
      }
    });
  }
}
