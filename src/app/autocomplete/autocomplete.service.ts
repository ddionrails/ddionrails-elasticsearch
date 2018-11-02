import {Injectable} from '@angular/core';

@Injectable()
export class AutocompleteService {
  get query() {
    return this._query;
  }

  set query(value) {
    this._query = value;
  }

  private _query;
  private results;

  constructor() {

    this._query = {
      "suggest": {
        "text": "",
        "name": {
          "completion": {
            "prefix": "",
            "field": "name.suggest",
            "fuzzy": "true"
          }
        },
        "study": {
          "completion": {
            "field": "study.suggest",
            "fuzzy": "true"
          }
        },
        "label": {
          "completion": {
            "prefix": "",
            "field": "label.suggest",
            "fuzzy": "true"
          }
        },
        "question": {
          "completion": {
            "prefix": "",
            "field": "question.suggest",
            "fuzzy": "true"
          }
        },
        "author": {
          "completion": {
            "prefix": "",
            "field": "author.suggest",
            "fuzzy": "true"
          }
        },
        "title": {
          "completion": {
            "prefix": "",
            "field": "title.suggest",
            "fuzzy": "true"
          }
        }
      }
    }
  };


  sendQuery() {
    let elasticsearch = require('elasticsearch');
    let query = this._query;
    let client = new elasticsearch.Client({

      host: location.protocol + '//' + window.location.host + '/elastic',
      //log: 'trace'
    });

    let promise = new Promise(
      function (resolve, reject) {

        client.search({
          index: 'dor',
          body: query,
        }).then(resp => resolve(resp))
          .catch(err => reject(err));
      });
    return promise;
  }

  autocomplete(queryterm) {
    this.setQueryTerm(queryterm);
    return this.sendQuery()
      .then(resp => this.toArray(resp))
      .catch(error => console.log());
  }

  toArray(resp) {
    const tmp = [];
    for (const i in resp.suggest) {
      for (let j = 0; j < resp.suggest[i][0].options.length; j++){
        tmp.push(resp.suggest[i][0].options[j].text)
      }
    }
      return tmp;
  }

  setQueryTerm(queryTerm) {
    // this.query.query.bool.must.query_string.query = '*' + queryTerm + '*';
    this._query.suggest.text = queryTerm;
  }

}
