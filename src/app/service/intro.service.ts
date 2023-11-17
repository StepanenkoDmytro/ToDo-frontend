import { Injectable } from '@angular/core';
import * as introJs from 'intro.js';

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private static INTRO_VIEWED_KEY = 'intro-viewed';
  private static INTRO_VIEWED_VALUE = 'done';

  private introJS = introJs.default();

  constructor() { }

  public startIntroJs(checkViewed: boolean) {
    if(checkViewed === true && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJS.setOption('nextLabel', 'Наступне >')
             .setOption('prevLabel', '< Попереднє')
             .setOption('doneLabel', 'Вихід')
             .setOption('skipLabel', 'Вихід')
             .setOption('exitOnEsc', true)
             .setOption('exitOnOverlayClick', true);

    this.introJS.start();

    this.introJS.onexit(() => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));
  }
}
