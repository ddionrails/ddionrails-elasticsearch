import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css']
})
export class VariableComponent implements OnInit {

  @Input() variable: any;
  private _urlRedirect = location.protocol + '//' + window.location.host + '/api/test/redirect/';

  constructor(private change: ChangeDetectorRef) {}

  ngOnInit() {
    this.restructure(this.variable);
    this.change.detectChanges();
  }

  get urlRedirect(): string {
    return this._urlRedirect;
  }

  set urlRedirect(value: string) {
    this._urlRedirect = value;
  }

  restructure(resp) {
    const varNew = {
      '_type': 'variable',
      'id': resp._id,
      'name': resp._source.name,
      'dataset': resp._source.dataset,
      'study': resp._source.study,
      'analysis_unit': resp._source.analysis_unit,
      'label': resp._source.label,
      'period': resp._source.period,
      'sub_type': resp._source.sub_type
    };
    this.variable = varNew;
  }

}
