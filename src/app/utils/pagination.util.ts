import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class PaginationUtil {
  paginateList(list: any[], pageSize: number = 10) {
    const result: any[] = [];
    for (let i = 0; i < list.length; i += pageSize) {
      result.push(list.slice(i, i + pageSize));
    }
    return result;
  }
}
