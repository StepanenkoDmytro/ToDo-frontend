import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Priority } from 'src/app/model/Priority';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-settings.dialog',
  templateUrl: './settings.dialog.component.html',
  styleUrls: ['./settings.dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  public priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandler: DataHandlerService
  ) { }

  public ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onAddPriority(priority: Priority): void {
    this.dataHandler.addPriority(priority).subscribe();
  }

  public onDeletePriority(priority: Priority): void {
    this.dataHandler.deletePriority(priority).subscribe();
  }

  public onUpdatePriority(priority: Priority): void {
    this.dataHandler.updatePriority(priority).subscribe();
  }
}
