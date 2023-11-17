import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from 'src/app/dialog/settings.dialog/settings.dialog.component';
import { IntroService } from 'src/app/service/intro.service';

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
  @Output()
  public toggleMenu = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private introService: IntroService,
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

  public showIntroHelp(): void {
    this.introService.startIntroJs(false);
  }

  public onToggleMenu(): void {
    this.toggleMenu.emit();
  }
}
