import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable({
  providedIn: 'root'
})
export class FilterPipe implements PipeTransform {

  transform(searchText: string, items: any[], props: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText || !props) {
      return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(element =>
      element[props]?.toLowerCase().includes(searchText)
    );
  }
}
