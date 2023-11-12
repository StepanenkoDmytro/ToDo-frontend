import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { Category } from 'src/app/model/Category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  public indexMouseMove: number | null;

  @Input()
  public categories: Category[];
  @Input()
  public selectedCategory: Category | null;

  @Output()
  public selectCategory = new EventEmitter<Category | null>();
  @Output()
  public deleteCategory = new EventEmitter<Category>();
  @Output()
  public updateCategory = new EventEmitter<Category>();

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  public showTasksByCategory(category: Category | null): void {

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }

  public showEditIcon(index: number | null) {
    this.indexMouseMove = index;
  }

  public openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редагування категорії'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }

      if(result as string) {
        category.title = result;

        this.updateCategory.emit(category);
        return;
      }
    })
  }
}
