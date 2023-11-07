import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'category', 'priority', 'status'];
  public dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false})
  private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  private sort: MatSort;

  public tasks: Task[];

  constructor(
    private dataHandler: DataHandlerService
  ) { }

  public ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  public ngAfterViewInit(): void {
    this.addTableObjects();
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
    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task: Task, colName: string) => {
      switch(colName) {

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
}
