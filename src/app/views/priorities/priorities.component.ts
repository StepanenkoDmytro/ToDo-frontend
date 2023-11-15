import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from 'src/app/dialog/OperType';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm.dialog/confirm.dialog.component';
import { EditPriorityDialogComponent } from 'src/app/dialog/edit-priority.dialog/edit-priority.dialog.component';
import { Priority } from 'src/app/model/Priority';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent {

  static defaultColor = '#fff';

  @Input()
  public priorities: Priority[];

  @Output()
  public deletePriority = new EventEmitter<Priority>();
  @Output()
  public updatePriority = new EventEmitter<Priority>();
  @Output()
  public addPriority = new EventEmitter<Priority>();

  constructor(
    private dialog: MatDialog
  ) { }

  public onAddPriority(): void {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: [
        '',
        'Додавання пріорітету',
        OperType.ADD
      ]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });
  }

  public onEditPriority(priority: Priority): void {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: [
        priority.title,
        'Редагування пріорітету',
        OperType.EDIT
      ]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }

      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });
  }

  public onDelete(priority: Priority): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: '',
        message: '',
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deletePriority.emit(priority);
      }
    });
  }
}
