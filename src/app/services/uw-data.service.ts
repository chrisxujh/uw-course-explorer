import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable()
export class UwDataService {
  private backendUrl: string;
  private apiKey: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.backendUrl = this.configService.getBackendUrl();
    this.apiKey = this.configService.getUwApiKey();
  }

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

  getCourseExamSchedule(subject: string, catalogNumber: string) {
    return this.uwDataGet(
      '/courses/' + subject + '/' + catalogNumber + '/examschedule'
    ).pipe(map((res: any) => res.data));
  }

  uwDataGet(target: string) {
    return this.httpClient.get(
      this.backendUrl + target + '.json?key=' + this.apiKey
    );
  }
}
