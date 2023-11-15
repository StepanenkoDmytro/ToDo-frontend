import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
}
