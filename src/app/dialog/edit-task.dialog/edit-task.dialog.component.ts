import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/model/Task';


@Component({
  selector: 'app-edit-task.dialog',
  templateUrl: './edit-task.dialog.component.html',
  styleUrls: ['./edit-task.dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  public dialogTitle: string;
  private task: Task; 

  tmpTitle: string;

  constructor(
      private  dialogRef: MatDialogRef<EditTaskDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) 
      private   data: [Task, string], 
  ) {
  }

  public ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1]; 

    this.tmpTitle = this.task.title;

  }

  public onConfirm(): void {

    this.task.title = this.tmpTitle;

    this.dialogRef.close(this.task);

  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }
}
