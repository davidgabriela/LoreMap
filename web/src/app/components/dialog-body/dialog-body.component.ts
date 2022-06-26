import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
})
export class DialogBodyComponent {
  dialogTitle: string = '';
  dialogLabel: string = '';
  dialogSubmit: string = '';
  selectData: any = [];
  selectHeader: string = '';
  textAreaLabel: string = '';
  formData: any = { name: '', selection: '' };

  @ViewChild(MatInput)
  input: HTMLElement | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem(newItem: string) {
    console.log('selected item:', newItem);
    this.formData.selection = newItem;
  }

  getFormData() {
    console.log('form data is: ', this.formData);
  }

  ngOnInit() {
    console.log(this.formData);
    this.dialogTitle = this.data.dialogTitle;
    this.dialogSubmit = this.data.dialogSubmit;
    if ('textAreaLabel' in this.data) {
      this.textAreaLabel = this.data.textAreaLabel;
    }
    if ('dialogLabel' in this.data) {
      this.dialogLabel = this.data.dialogLabel;
    }
    if ('selectData' in this.data) {
      this.selectData = this.data.selectData;
    }
    if ('selectHeader' in this.data) {
      this.selectHeader = this.data.selectHeader;
    }
  }
}
