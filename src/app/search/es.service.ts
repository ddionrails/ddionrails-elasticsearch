import * as Elasticsearch from 'elasticsearch';
import { Injectable } from '@angular/core';


@Injectable()
export class EsService {
  get query() {
    return this._query;
  }

  set query(value) {
    this._query = value;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  private _query;
  private _size = 25;

  search(queryTerm, filter, pageNumber){

    this.resetQuery();
    this.setQueryTerm(queryTerm);
    this.setFilter(filter);
    this.setOffset(pageNumber);
    return this.connectToServer();
  }

  resetQuery(){

    this._query = {
      "from": 0,
      "size": 25,
      "query": {
        "bool": {
          "must": {
            "query_string":{
              "query": ""
            },
          },
          "filter": [
            { "terms": {"_type": ["question", "variable", "publication", "concept"]}}
          ],
          // "filter": {
          //   "exists" : { "field" : "boost" }
          // },
        },
      },
      "aggregations": {
        "group_by_analysis_unit": {
          "terms": {
            "field": "analysis_unit"
          }
        },
        "group_by_type": {
          "terms": {
            "field": "_type"
          }
        },
        "group_by_period": {
          "terms": {
            "field": "period",
            "order": { "_term" : "desc" },
            "size": 0
          }
        },
        "group_by_study": {
          "terms": {
            "field": "study.raw",
            "size": 0
          }
        },
        "group_by_subtype": {
          "terms": {
            "field": "sub_type.raw"
          }
        }
      }
    };
  }

  setQueryTerm(queryTerm) {
    this._query.query.bool.must.query_string.query = queryTerm;
  }

  setOffset(pageNumber){
    this._query["from"] = (pageNumber - 1) * this._size;
    this._query.size = this._size;
  }

  setFilter(filter){

    for(let i in filter){
      if(filter[i] == "" && !(("terms." + i) in this._query.query.bool.filter)){

      } else if(filter[i] == "" && (("terms." + i) in this._query.query.bool.filter)){
        delete this._query.query.bool.filter["terms[i]"]
      } else {
        let tmp = {"terms" : {}}
        tmp.terms[i] = filter[i]
        this._query.query.bool.filter.push(tmp);
      }
    }
  };

  connectToServer(){

    let elasticsearch = require('elasticsearch');
    let query = this._query;
    let client = new elasticsearch.Client({

     host: location.protocol + '//' + window.location.host + '/elastic',
     log: 'trace'
    });

    let promise = new Promise(
      function(resolve, reject){

        client.search({
          index: 'dor',
          body: query,
        }).then(resp => resolve(resp))
          .catch(err => reject(err));
      }
    )
    return promise;
  };


}

