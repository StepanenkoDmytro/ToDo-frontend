import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from 'src/app/dialog/OperType';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { Category } from 'src/app/model/Category';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  public isMobile: boolean;
  public isTablet: boolean;
  public searchCategoryTitle: string;
  public indexMouseMove: number | null;
  public  selectedCategoryMap: Map<Category, number>;

  @Input()
  public categories: Category[];
  @Input()
  public selectedCategory: Category | null;
  @Input('categoryMap')
  public set setCategoryMap(categoryMap: Map<Category, number>) {
    this.selectedCategoryMap = categoryMap;
  }
  @Input()
  public uncompletedTotal: number;

  @Output()
  public selectCategory = new EventEmitter<Category | null>();
  @Output()
  public deleteCategory = new EventEmitter<Category>();
  @Output()
  public updateCategory = new EventEmitter<Category>();
  @Output()
  public addCategory = new EventEmitter<string>();
  @Output()
  public searchCategory = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService
  ) { 

    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }

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
      data: [category.title, 'Редагування категорії', OperType.EDIT],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }

      if (result as string) {
        category.title = result;

        this.updateCategory.emit(category);
        return;
      }
    })
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Додавання категорії', OperType.ADD],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result as string) {
        this.addCategory.emit(result);
      }
    })
  }

  public search(): void {
    if (this.searchCategoryTitle === null) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
