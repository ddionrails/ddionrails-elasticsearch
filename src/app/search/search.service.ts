import {Injectable, Output} from '@angular/core';
import {ResponseService} from './response.service'
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class SearchService {

  public newQuery = false;
  public response;
  public queryTerm;
  public pageNumber = 1; // hard coded!
  public responseChanged = new ReplaySubject<any>(1);
  public filter = {
    "study.raw": [],
    "_type": [],
    "analysis_unit": [],
    "period": [],
    "sub_type.raw": []
  };

  constructor(private responseService: ResponseService) {
  }

  search() {
    return this.responseService.getData(this.queryTerm, this.filter, this.pageNumber)
      .then(resp => this.responseChanged.next(resp))
  }

  resetAllFilter() {
    for (var prop in this.filter) {
      this.filter[prop] = []
    }

  }

  resetFilter(key) {
    this.filter[key] = [];
  }

}
