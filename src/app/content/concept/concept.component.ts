import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {

  @Input() concept;
  private _urlRedirect = location.protocol + '//' + window.location.host + '/api/test/redirect/';

  constructor(private change: ChangeDetectorRef) {}

  ngOnInit() {
    this.restructure(this.concept);
    this.change.detectChanges();
  }

  get urlRedirect(): string {
    return this._urlRedirect;
  }

  set urlRedirect(value: string) {
    this._urlRedirect = value;
  }

  restructure(resp) {
    const concNew = {
      '_type': 'concept',
      'id': resp._id,
      'label': resp._source.label,
      'study': resp._source.study,
      'name': resp._source.name,
    };

    this.concept = concNew;
  }


}
