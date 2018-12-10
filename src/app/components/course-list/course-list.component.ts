import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
    this.courses$ = this.store.select(fromStore.findCoursesEntitiesSelector);
    this.isLoading$ = this.store.select(fromStore.findCoursesLoadingSelector);
    this.isError$ = this.store.select(fromStore.findCoursesErrorSelector);
  }

  handleFilter(val: string) {
    this.filter =
      val !== ''
        ? new RegExp(
            val
              .toUpperCase()
              .split('')
              .filter(c => c !== ' ')
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
