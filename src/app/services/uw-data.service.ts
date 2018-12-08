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

  getCourseSchedule(termId: string, subject: string, catalogNumber: string) {
    return this.uwDataGet(
      '/terms/' + termId + '/' + subject + '/' + catalogNumber + '/schedule'
    ).pipe(map((res: any) => res.data));
  }

  getCourseExamSchedule(subject: string, catalogNumber: string) {
    return this.uwDataGet(
      '/courses/' + subject + '/' + catalogNumber + '/examschedule'
    ).pipe(map((res: any) => res.data));
  }

  getTermsList() {
    return this.uwDataGet('/terms/list').pipe(map((res: any) => res.data));
  }

  getTermsInfo() {
    return this.getTermsList().pipe(
      map(termsList => this.processTermsList(termsList))
    );
  }

  processTermsList(termsList: any) {
    termsList.previous_term = this.selectTermFromTermsListById(
      termsList,
      termsList.previous_term
    );
    termsList.current_term = this.selectTermFromTermsListById(
      termsList,
      termsList.current_term
    );
    termsList.next_term = this.selectTermFromTermsListById(
      termsList,
      termsList.next_term
    );
    return termsList;
  }

  selectTermFromTermsListById(termsList: any, id: string) {
    const terms = termsList.listings;
    let result = null;
    Object.keys(terms).forEach(key => {
      terms[key].forEach(term => {
        if (term.id === id) {
          result = term;
        }
      });
    });
    return result;
  }

  uwDataGet(target: string) {
    return this.httpClient.get(
      this.backendUrl + target + '.json?key=' + this.apiKey
    );
  }
}
