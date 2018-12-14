import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ConfigService } from '../../services/config.service';
import { PaginationUtil } from '../../utils';

import * as fromStore from '../../store';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  private currentPage = 0;
  private subjects: any[];
  private subjectFilter: RegExp = null;
  subjectsData$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;
  popularSubjects$: Observable<any>;

  constructor(
    private store: Store<fromStore.StoreState>,
    private configService: ConfigService,
    private paginationUtil: PaginationUtil
  ) {}

  ngOnInit() {
    this.subjectsData$ = this.store.pipe(
      select(fromStore.getCoursesEntitiesSelector),
      map(subjects => {
        this.subjects = subjects;
        const filteredSubjects = this.filterSubjects(subjects);
        const paginatedSubjects = this.paginationUtil.paginateList(
          filteredSubjects,
          20
        );
        const subjectsToDisplay = paginatedSubjects[this.currentPage];
        return { subjects, paginatedSubjects, subjectsToDisplay };
      })
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getCoursesLoadingSelector)
    );
    this.isError$ = this.store.pipe(select(fromStore.getCoursesErrorSelector));
    this.requestSubjectData();
    this.popularSubjects$ = this.configService
      .getPopularSubjects()
      .pipe(catchError(() => of([])));
  }

  handleFilter(val: any) {
    this.subjectFilter =
      val !== ''
        ? new RegExp(
            val
              .toUpperCase()
              .replace(/\s/g, '')
              .split('')
              .map(c => c + '\\s*')
              .reduce((acc, curr) => acc + curr)
          )
        : null;
    this.currentPage = 0;
    this.reloadSubjectsData();
  }

  handlePaginationEvent(newPage: number) {
    this.currentPage = newPage;
    this.reloadSubjectsData();
  }

  private filterSubjects(subjects: any[]) {
    return this.subjectFilter === null
      ? subjects
      : subjects.filter(
          subject =>
            subject.subject.toUpperCase().match(this.subjectFilter) ||
            subject.description.toUpperCase().match(this.subjectFilter)
        );
  }

  private requestSubjectData() {
    this.store.dispatch(new fromStore.GetSubjects());
  }

  private reloadSubjectsData() {
    this.store.dispatch(
      new fromStore.GetSubjectsSuccess(this.subjects.slice(0))
    );
  }
}
