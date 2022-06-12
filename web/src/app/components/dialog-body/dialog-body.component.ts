import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dialogTitle = this.data.dialogTitle;
    this.dialogLabel = this.data.dialogLabel;
    this.dialogSubmit = this.data.dialogSubmit;
    console.log(this.data);
  }
}
