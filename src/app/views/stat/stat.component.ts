import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {
  @Input()
  public totalTasksInCategory: number; 

  @Input()
  public completeTasksInCategory: number; 

  @Input()
  public uncompleteTasksInCategory: number; 

  @Input()
  public showStat: boolean;
}
