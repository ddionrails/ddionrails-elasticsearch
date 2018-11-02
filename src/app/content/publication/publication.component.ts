import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';

@Component({
  selector: 'publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @Input() publication: any;
  private _urlRedirect = location.protocol + '//' + window.location.host + '/api/test/redirect/';

  constructor(private change: ChangeDetectorRef) {}

  ngOnInit() {
    this.restructure(this.publication);
    this.change.detectChanges();
  }

  get urlRedirect(): string {
    return this._urlRedirect;
  }

  set urlRedirect(value: string) {
    this._urlRedirect = value;
  }

  restructure(resp) {
    const pubNew = {
      '_type': 'publication',
      'id': resp._id,
      'title': resp._source.title,
      'author': resp._source.author,
      'year': resp._source.year,
      'study': resp._source.study
    };
    this.publication = pubNew;
  }

}
