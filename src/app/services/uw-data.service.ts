import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UwDataService {
  private backendUrl = 'api.uwaterloo.ca/v2';
  private apiKey = 'a9e6e1c758257c4222b19293fd7ff2be';

  constructor(private httpClient: HttpClient) {}

  getSubjects() {
    return this.uwDataGet('/codes/subjects').pipe(map((res: any) => res.data));
  }

  getCoursesBySubject(subjectId: string) {
    return this.uwDataGet('/courses/' + subjectId).pipe(
      map((res: any) => res.data)
    );
  }

  getCourseByCourseId(courseId: string) {
    return this.uwDataGet('/courses/' + courseId).pipe(
      map((res: any) => res.data)
    );
  }

  getCourseSchedule(subject: string, catalogNumber: string) {
    return this.uwDataGet(
      '/courses/' + subject + '/' + catalogNumber + '/schedule'
    ).pipe(map((res: any) => res.data));
  }

  uwDataGet(target: string) {
    return this.httpClient.get(
      'https://' + this.backendUrl + target + '.json?key=' + this.apiKey
    );
  }
}
