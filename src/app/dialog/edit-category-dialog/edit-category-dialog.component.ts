import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm.dialog/confirm.dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  
  public dialogTitle: string;
  public categoryTitle: string;
  public operType: OperType;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: [string, string, OperType],
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }

  public onConfirm(): void {
    this.dialogRef.close(this.categoryTitle);
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію',
        message: `Ви дійсно хочете видалити задачу: ${this.categoryTitle}?, самі задачі не будуть видалені`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  public canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }
}
