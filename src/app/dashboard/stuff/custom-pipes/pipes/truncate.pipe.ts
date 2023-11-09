import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...limits: number[]): string {
    let slicedValue = value.slice(0, limits[0]) + '...';
    return value.length < limits[0] ? value : slicedValue;
  }
}
