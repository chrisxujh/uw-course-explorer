import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;
  filter: RegExp = null;

  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.courses$ = this.store.pipe(
      select(fromStore.getCoursesEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getCoursesLoadingSelector)
    );
    this.isError$ = this.store.pipe(select(fromStore.getCoursesErrorSelector));
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
}
