import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';


@Component({
  selector: 'app-edit-task.dialog',
  templateUrl: './edit-task.dialog.component.html',
  styleUrls: ['./edit-task.dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  public categories: Category[];
  public priorities: Priority[];

  public dialogTitle: string;
  private task: Task;

  public tmpTitle: string;
  public tmpCategoty: Category;
  public tmpPriority: Priority;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: [Task, string],
    private dataHandler: DataHandlerService
  ) {
  }

  public ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

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

    this.dialogRef.close(this.task);

  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }
}
