import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {SearchService} from '../search/search.service';
import {AutocompleteService} from "../autocomplete/autocomplete.service";
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
  selector: 'searchBar',
  templateUrl: './searchBar.component.html',
  styleUrls: ['./searchBar.component.css'],
})

export class SearchBarComponent implements OnInit {

  private _queryTerm: '';
  @Input() study;
  @Input() type;
  @Input() q;
  @Output() resetQuery = new EventEmitter();
  @Output() showContentSection = new EventEmitter();
  private _keepFilters = false;
  public responseChanged = new ReplaySubject<any>(1);
  private _responseObjects = [];
  private _showAutoComplete;

  get showAutoComplete() {
    return this._showAutoComplete;
  }

  set showAutoComplete(value) {
    this._showAutoComplete = value;
  }
  get keepFilters(): boolean {
    return this._keepFilters;
  }

  set keepFilters(value: boolean) {
    this._keepFilters = value;
  }

  get responseObjects(): Array<any> {
    return this._responseObjects;
  }

  get queryTerm() {
    return this._queryTerm;
  }

  set queryTerm(value) {
    this._queryTerm = value;
  }

  set responseObjects(value: Array<any>) {
    this._responseObjects = value;
  }


  constructor(private searchService: SearchService, private autocompleteService: AutocompleteService) {
  };

  ngOnInit() {

    this._showAutoComplete = true;
    this.setDefaultFilter();

    if (this.q != null) {
      this._queryTerm = this.q;
      this.initialSearch();
    }

    this.responseChanged
      .subscribe(resp => {
        this._responseObjects = resp;
      });
  }

  search() {
    this.searchService.queryTerm = this._queryTerm;
    if (!this._keepFilters) {
      this.resetQuery.emit(true);
      this.searchService.resetAllFilter();
      this.setDefaultFilter();
    }
    this.searchService.pageNumber = 1;
    this.searchService.search();
    this.showContentSection.emit(true);
    this._showAutoComplete = false;
  }

  initialSearch(){
    this.searchService.queryTerm = this._queryTerm;
    this.searchService.pageNumber = 1;
    this.searchService.search();
    this.showContentSection.emit(true);
  }

  setDefaultFilter() {
    if (this.study != null) {
      this.searchService.filter['study.raw'].push(this.study);
    }
    if (this.type != null) {
      this.searchService.filter['_type'].push(this.type);
    }
  }

  autocomplete(){

    this._showAutoComplete = true;
    this._responseObjects = [];
    if(this._queryTerm.length >= 3) {
      this.autocompleteService.autocomplete(this._queryTerm)
        .then(resp => this.responseChanged.next(resp));
    }
  }

  search2(queryTerm){
    this._queryTerm = queryTerm;
    this.search();
  }

}
