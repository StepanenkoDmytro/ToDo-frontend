import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperType } from 'src/app/dialog/OperType';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm.dialog/confirm.dialog.component';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task.dialog/edit-task.dialog.component';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operation', 'status'];
  public dataSource: MatTableDataSource<Task>;

  public tasks: Task[];
  public priorities: Priority[];

  public searchTaskText: string;
  public selectedStatusFilter: boolean | null;
  public selectedPriorityFilter: Priority | null;

  @ViewChild(MatPaginator, { static: false })
  private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private sort: MatSort;

  @Input('tasks')
  public set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }
  @Input('priorities')
  public set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }
  @Input()
  public selectedCategory: Category | null;

  @Output()
  public updateTask = new EventEmitter<Task>();
  @Output()
  public deleteTask = new EventEmitter<Task>();
  @Output()
  public selectCategory = new EventEmitter<Category>();
  @Output()
  public filterByTitle = new EventEmitter<string>();
  @Output()
  public filterByStatus = new EventEmitter<boolean | null>();
  @Output()
  public filterByPriority = new EventEmitter<Priority | null>();
  @Output()
  public addTask = new EventEmitter<Task>();

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  public onToogleStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
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
          return task.category && task.category.id ? task.category.id.toString() : '';
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
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, task.title, OperType.EDIT],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  public openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію',
        message: `Ви дійсно хочете видалити задачу: ${task.title}?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  public openAddTaskDialog(): void {
    const task = new Task(null, '', false, null, this.selectedCategory)
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Додавання задачі', OperType.ADD],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask.emit(task);
      }
    });
  }

  public onSelectCategory(category: Category) {
    this.selectCategory.emit(category)
  }

  public onFilterByStatus(value: boolean | null): void {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  public onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  public onFilterByPriority(priority: Priority | null): void {
    if (priority !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = priority;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }
}
