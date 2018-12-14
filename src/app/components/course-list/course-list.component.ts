import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PaginationUtil } from '../../utils';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() subject: string;
  courses: any[];
  pagedCourses: any[];
  courses$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;
  currentPage = 0;
  filter: RegExp = null;

  constructor(
    private store: Store<fromStore.StoreState>,
    private paginationUtil: PaginationUtil
  ) {}

  ngOnInit() {
    this.courses$ = this.store.pipe(
      select(fromStore.getCoursesEntitiesSelector),
      tap(courses => (this.courses = courses)),
      map(courses => this.filterCourses(courses)),
      map(courses => this.paginationUtil.paginateList(courses)),
      tap(pagedCourses => (this.pagedCourses = pagedCourses)),
      map(pagedCourses =>
        pagedCourses[this.currentPage] ? pagedCourses[this.currentPage] : []
      )
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getCoursesLoadingSelector)
    );
    this.isError$ = this.store.pipe(select(fromStore.getCoursesErrorSelector));
  }

  handlePaginatorEvent(index: number) {
    this.currentPage = index;
    this.reloadData();
  }

  handleFilter(val: string) {
    this.filter =
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
    this.reloadData();
  }

  filterCourses(courses: any) {
    return this.filter === null
      ? courses
      : courses.filter(
          course =>
            (course.subject + course.catalog_number)
              .toUpperCase()
              .match(this.filter) ||
            course.title.toUpperCase().match(this.filter) ||
            course.course_id.toUpperCase().match(this.filter)
        );
  }

  private reloadData() {
    this.store.dispatch(new fromStore.GetCoursesSuccess(this.courses.slice(0)));
  }
}
