import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'fillArray'
})

export class FillArrayPipe implements PipeTransform {

    transform(value) {
        // return (new Array(value)).fill().map((x,i)=>i+1);
    }
}