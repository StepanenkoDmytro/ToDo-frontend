import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(date: Date | string, format: string = 'mediumDate'): string {
    if(date == null) {
      return 'Терін відсутній';
    }

    date = new Date(date);
    const currentDate = new Date().getDate();

    if(date.getDate() === currentDate) {
      return 'Сьогодні';
    }

    if(date.getDate() === currentDate - 1) {
      return 'Вчора';
    }

    if(date.getDate() === currentDate + 1) {
      return 'Завтра';
    }
    return new DatePipe(this.locale).transform(date, format) || '';
  }
}
