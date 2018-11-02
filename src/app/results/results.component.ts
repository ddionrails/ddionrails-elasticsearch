import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {SearchService} from '../search/search.service';
import {ContentComponent} from '../content/content.component';


@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  get showContent() {
    return this._showContent;
  }

  set showContent(value) {
    this._showContent = value;
  }

  private _response;
  @Input() study;
  @Input() basket;
  @Input() type;
  @Input() q;
  private _showContent;
  @Output() resetPagination = new EventEmitter<any>();

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.responseChanged
      .subscribe(res => this._response = res);
  }

  @ViewChild(ContentComponent)
  public content: ContentComponent;

  get response() {
    return this._response;
  }

  set response(value) {
    this._response = value;
  }

  resetQuery(b) {
    this.content.resetPagination();
  }

  showContentSection(b){
    this._showContent = true;
  }
}
