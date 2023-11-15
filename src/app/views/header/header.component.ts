import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from 'src/app/dialog/settings.dialog/settings.dialog.component';

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

  constructor(
    private dialog: MatDialog,
  ) { }

  public onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

  public showSettings(): void {
    this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px',
    });
  }
}
