import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OperType } from '../OperType';
import { ConfirmDialogComponent } from '../confirm.dialog/confirm.dialog.component';

@Component({
  selector: 'app-edit-priority.dialog',
  templateUrl: './edit-priority.dialog.component.html',
  styleUrls: ['./edit-priority.dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  public dialogTitle: string;
  public priorityTitle: string;
  public operType: OperType;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: [string, string, OperType],
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }

  public onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію',
        message: `Ви дійсно хочете видалити пріорітет: ${this.priorityTitle}?`,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  public canDelete(): boolean {
    return this.operType == OperType.EDIT;
  }
}
