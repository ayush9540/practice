import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySearchFilter'
})
export class ArraySearchFilterPipe implements PipeTransform {

  transform(values: any, searchWith?: any): any {
    if (!values) return [];
    if (!searchWith) return values;
    searchWith = searchWith.toLowerCase();
    return values.filter(it => {
      return it.toLowerCase().includes(searchWith);
    });
  }

}
