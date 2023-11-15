import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  @Input()
  public categoryName: string;
  @Input()
  public showStat: boolean;

  @Output()
  public toggleStat = new EventEmitter<boolean>();

  public onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }
}
