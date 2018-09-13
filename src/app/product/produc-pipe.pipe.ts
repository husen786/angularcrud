import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space'
})
export class ProducPipePipe implements PipeTransform {
  

  transform(value: string,character:string): string {
    return value.replace(character,' ');
  }

}
