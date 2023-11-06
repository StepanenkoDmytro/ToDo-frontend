import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  ngOnInit(): void {
    this.totalTasksCountInCategory = 10;
    this.completedCountInCategory = 1;
    this.uncompletedCountInCategory = 5;
    this.uncompletedTotalTasksCount = 5;
  }
}
