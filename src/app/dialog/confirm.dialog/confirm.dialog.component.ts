import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm.dialog',
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent {

  public dialogTitle: string;
  public message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { dialogTitle: string, message: string }
  ) { 
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

}
