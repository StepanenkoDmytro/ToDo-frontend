import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm.dialog/confirm.dialog.component';
import { OperType } from '../OperType';


@Component({
  selector: 'app-edit-task.dialog',
  templateUrl: './edit-task.dialog.component.html',
  styleUrls: ['./edit-task.dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  public categories: Category[];
  public priorities: Priority[];

  public dialogTitle: string;
  public operType: OperType;
  public task: Task;

  public tmpTitle: string;
  public tmpCategoty: Category;
  public tmpPriority: Priority;
  public tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: [Task, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

    this.tmpTitle = this.task.title;

    if (this.task.category) {
      this.tmpCategoty = this.task.category;
    }

    if (this.task.priority) {
      this.tmpPriority = this.task.priority;
    }

    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  public onConfirm(): void {

    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategoty;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);

  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public detele(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію',
        message: `Ви дійсно хочете видалити задачу: ${this.task.title}?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    })
  }

  public activate(): void {
    this.dialogRef.close('activate');
  }

  public complete(): void {
    this.dialogRef.close('complete');
  }

  public canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  public canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
