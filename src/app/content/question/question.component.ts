import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question;
  private _urlRedirect = location.protocol + '//' + window.location.host + '/api/test/redirect/';

  constructor(private change: ChangeDetectorRef) {}

  ngOnInit() {
    this.restructure(this.question);
    this.change.detectChanges();
  }

  get urlRedirect(): string {
    return this._urlRedirect;
  }

  set urlRedirect(value: string) {
    this._urlRedirect = value;
  }

  restructure(resp) {
    const questNew = {
      '_type': 'question',
      'id': resp._id,
      'study': resp._source.study,
      'questionnaire': resp._source.instrument,
      'period': resp._source.period,
      'analysis_unit': resp._source.analysis_unit,
      'question': resp._source.question
    };
    if (resp._source.items instanceof Array) {
      questNew['text'] = resp._source.items[0].text;
    } else {
      questNew['text'] = resp._source.items.root.text;
    }

    this.question = questNew;
  }

}
