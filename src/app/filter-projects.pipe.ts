import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjects'
})
export class FilterProjectsPipe implements PipeTransform {

  transform(value: any, q: any): any[] {
  if( q === '' || q === null || q === undefined) {
    return value;
  }
  return value.filter(obj => obj.titre_project.includes(q));

  }

}
