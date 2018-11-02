import {Injectable} from '@angular/core';
import {EsService} from './es.service';

@Injectable()
export class ResponseService {

  constructor(private esService: EsService) {
  }

  getData(queryTerm, filter, pageNumber) {
    return this.esService.search(queryTerm, filter, pageNumber)
      .then(resp => this.structure(resp))
      .then(resp => resp)
      .catch(error => console.log());
  }

  structure(resp) {
    const promise = new Promise(
      function (resolve, reject) {

        const strucResponse = {
          'total': 0,
          'content': [],
          'aggs': [],
          'suggest': []
        };

        strucResponse.total = resp.hits.total;

        //Content
        for (let i = 0; i < resp.hits.hits.length; i++) {
          strucResponse.content.push(resp.hits.hits[i]);
        }

        // Aggregations
        for (const aggType in resp.aggregations) {
          const tmp = {
            'type': aggType,
            'buckets': resp.aggregations[aggType].buckets
          };
          strucResponse.aggs.push(tmp);
        }

        // Suggestions
        for(const i in resp.suggest) {
          console.log("hier")
            for(let j = 0; j < resp.suggest[i][0].options.length; j++){
              console.log(resp.suggest[i][0].options[j].text)
            }
        }

        resolve(strucResponse);
      }
    );
    return promise;
  }

}
