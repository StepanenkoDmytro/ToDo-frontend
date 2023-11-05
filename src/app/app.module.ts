import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { StatComponent } from './views/stat/stat.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    FooterComponent,
    HeaderComponent,
    StatComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
