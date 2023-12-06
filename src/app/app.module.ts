import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { StatComponent } from './views/stat/stat.component';
import { StatCardComponent } from './views/stat/stat-card/stat-card.component';
import { FormsModule } from '@angular/forms';
import { EditTaskDialogComponent } from './dialog/edit-task.dialog/edit-task.dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm.dialog/confirm.dialog.component';
import { TaskDatePipe } from './pipe/task-date.pipe';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { SettingsDialogComponent } from './dialog/settings.dialog/settings.dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditPriorityDialogComponent } from './dialog/edit-priority.dialog/edit-priority.dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { TASK_URL_TOKEN } from './data/dao/impl/task.service';
import { CATEGORY_URL_TOKEN } from './data/dao/impl/category.service';
import { PRIORITY_URL_TOKEN } from './data/dao/impl/priority.service';
import { STAT_URL_TOKEN } from './data/dao/impl/stat.service';


registerLocaleData(localeUk, 'uk-UA');

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    FooterComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    PrioritiesComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'uk-UA'
    },
    {
      provide: TASK_URL_TOKEN,
      useValue: 'http://localhost:8080/task'
    },
    {
      provide: CATEGORY_URL_TOKEN,
      useValue: 'http://localhost:8080/category'
    },
    {
      provide: PRIORITY_URL_TOKEN,
      useValue: 'http://localhost:8080/priority'
    },
    {
      provide: STAT_URL_TOKEN,
      useValue: 'http://localhost:8080/stat'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
