import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'category', 'priority', 'status'];
  public dataSource: MatTableDataSource<Task>;

  public tasks: Task[];

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  public ngOnInit(): void {
    this.dataHandler.tasks$.subscribe(tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  public toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  public getPriorityColor(task: Task): string {
    if(task.completed) {
      return '#F8F9FA';
    }
    if(task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

  private refreshTable(): void {
    this.dataSource.data = this.tasks;
  }
}
