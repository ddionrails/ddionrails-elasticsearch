import {Component, OnInit, Injectable, Input} from '@angular/core';
import {SearchService} from '../search/search.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

@Injectable()
export class FilterComponent implements OnInit {

  private _response;

  constructor(private _searchService: SearchService) {}

  ngOnInit() {
    this._searchService.responseChanged
      .subscribe(resp => this._response = resp);
  }

  get response() {
    return this._response;
  }

  get searchService(): SearchService {
    return this._searchService;
  }

  set searchService(value: SearchService) {
    this._searchService = value;
  }

  set response(value) {
    this._response = value;
  }

  updateFilters(key, val) {
    const index = this._searchService.filter[key].indexOf(val);
    if (index > -1) {
      this._searchService.filter[key].splice(index, 1);
      if (this._searchService.filter._type.indexOf('variable') === -1){
        this._searchService.resetFilter('sub_type.raw');
      }
    } else {
      this._searchService.filter[key].push(val);
    }
    this._searchService.pageNumber = 1;
    this._searchService.search();
  }

}
