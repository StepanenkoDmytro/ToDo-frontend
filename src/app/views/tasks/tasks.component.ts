import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task.dialog/edit-task.dialog.component';
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
  

  @ViewChild(MatPaginator, { static: false })
  private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private sort: MatSort;

  // @Input()
  public tasks: Task[];

  @Input('tasks')
  public set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  public updateTask = new EventEmitter<Task>();

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  public toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  public getPriorityColor(task: Task): string {
    if (task.completed) {
      return '#F8F9FA';
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  private fillTable(): void {
    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task: Task, colName: string) => {
      switch (colName) {

        case 'priority': {
          return task.priority ? task.priority.id.toString() : '';
        }

        case 'category': {
          return task.category ? task.category.id.toString() : '';
        }

        case 'date': {
          return task.date ? task.date.toString() : '';
        }

        default: {
          return task.title;
        }
      }
    }
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  public openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, task.title], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      if(result as Task) {
        this.updateTask.emit(task);
        return;
      }
    })
  }
}
