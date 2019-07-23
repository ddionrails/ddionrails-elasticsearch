import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  private _response;
  private _modalContent;
  private _urlPreview = location.protocol + '//' + window.location.host + '/api/test/preview/';
  private _urlRedirect = location.protocol + '//' + window.location.host + '/api/test/redirect/';
  @Input() study;
  @Input() basket;
  private _lastPage = false;
  private _firstPage = true;
  private _resultsPerPage = 25;
  private _pageNumber = this.searchService.pageNumber;
  private _modalHeader: string;
  private _redirectType;
  private _redirectId;


  get response() {
    return this._response;
  }

  set response(value) {
    this._response = value;
  }

  get modalContent() {
    return this._modalContent;
  }

  set modalContent(value) {
    this._modalContent = value;
  }

  get urlRedirect(): string {
    return this._urlRedirect;
  }

  set urlRedirect(value: string) {
    this._urlRedirect = value;
  }

  get lastPage(): boolean {
    return this._lastPage;
  }

  set lastPage(value: boolean) {
    this._lastPage = value;
  }

  get firstPage(): boolean {
    return this._firstPage;
  }

  set firstPage(value: boolean) {
    this._firstPage = value;
  }

  get modalHeader(): string {
    return this._modalHeader;
  }

  set modalHeader(value: string) {
    this._modalHeader = value;
  }

  get redirectType() {
    return this._redirectType;
  }

  set redirectType(value) {
    this._redirectType = value;
  }

  get redirectId() {
    return this._redirectId;
  }

  set redirectId(value) {
    this._redirectId = value;
  }


  constructor(private searchService: SearchService, private http: Http) {}

  ngOnInit() {
    this.searchService.responseChanged
      .subscribe(resp => {
        this._response = resp;
        this.resetPagination();
      });
  };

  nextPage() {
    ++this.searchService.pageNumber;
    if (this.searchService.pageNumber * this._resultsPerPage >= this._response.total) {
      this._lastPage = true;
    } else {
      this._lastPage = false;
    }
    this._firstPage = false;
    this.searchService.search();
  }

  previousPage() {
    --this.searchService.pageNumber;
    if (this.searchService.pageNumber === 1) {
      this._firstPage = true;
    } else {
      this._lastPage = false;
    }
    this.searchService.search();
  }

  resetPagination() {
    if (typeof this._response !== 'undefined' && this.searchService.pageNumber * this._resultsPerPage >= this._response.total) {
      this._lastPage = true;
    } else {
      this._lastPage = false;
    }
    if (this.searchService.pageNumber === 1) {
      this._firstPage = true;
    } else {
      this._firstPage = false;
    }
  }

  getModalContent(type, id) {

    // Save id and type for redirection for use in template
    this._redirectId = id;
    this._redirectType = type;

    const response = this.getRequest(type, id);
    response.subscribe(
      resp => this.structureModalContent(resp, type, id),
      error => {
        const noPreview = {};
        noPreview['name'] = ' ';
        noPreview['title'] = 'No preview aivailable.';
        this.structureModalContent(noPreview, type, id);
      });
  }

  getRequest(type, id) {
    const urlPreview = this._urlPreview + type + '/' + id;

    return this.http.get(urlPreview)
      .map(res => res.json());
  }

  structureModalContent(response, type, id) {
    let icon;

    switch (type) {
      case('question'):
        icon = '<i class="search-icon fas fa-tasks"></i>';
        break;
      case('variable'):
        icon = '<i class="search-icon fas fa-chart-bar"></i>';
        break;
      case('concept'):
        icon = '<i class="search-icon fas fa-cog"></i>';
        break;
      default:
        icon = '?';
    }

    this._modalHeader = icon + ' [' + response.name + '] ' + response.title;
    this._modalContent = response.html;

  }




}
