import {Component, ElementRef} from '@angular/core';
import {ResultsComponent} from './results/results.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public study;
  public basket;
  public type;
  public q;

  constructor(elm: ElementRef) {

    if (elm.nativeElement.hasAttribute('study')) {
      this.study = elm.nativeElement.getAttribute('study');
    } else {
      this.study = null;
    }

    if (elm.nativeElement.hasAttribute('basket')) {
      this.basket = elm.nativeElement.getAttribute('basket');
    } else {
      this.basket = null;
    }

    if (elm.nativeElement.hasAttribute('type')) {
      this.type = elm.nativeElement.getAttribute('type');
    } else {
      this.type = null;
    }

    if (elm.nativeElement.hasAttribute('q')) {
      this.q = elm.nativeElement.getAttribute('q');
    } else {
      this.q = null;
    }
  }


}
