import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelByNumber',
})
export class VowelByNumberPipe implements PipeTransform {
  transform(value: string): string {
    const valueLower = value.toLowerCase()
    return valueLower
      .replace(/(a)/g, '1')
      .replace(/(e)/g, '2')
      .replace(/(i)/g, '3')
      .replace(/(o)/g, '4')
      .replace(/(u)/g, "5");
  }
}
