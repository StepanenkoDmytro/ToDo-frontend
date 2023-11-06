import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {
  @Input()
  completed = false;

  @Input()
  iconName: string;

  @Input()
  count1: any; // можно передавать любой тип для отображения (число, текст и пр.)

  @Input()
  countTotal: any;

  @Input()
  title: string;
}
