import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const data of value) {
      // Filtra por nombre y apellido
      if (data.nombre.toUpperCase().indexOf(arg.toUpperCase()) > -1) {
        resultPosts.push(data);
        console.log('El ressultado es ' + JSON.stringify(resultPosts));
        return resultPosts;
      }
    }
  }
}
