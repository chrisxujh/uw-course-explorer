import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.StoreState>
  ) {}

  ngOnInit() {
    this.course$ = this.store.select(fromStore.getCoursesEntitiesSelector);
    this.isLoading$ = this.store.select(fromStore.getCoursesLoadingSelector);
    this.isError$ = this.store.select(fromStore.getCoursesErrorSelector);
    this.requestCourseData();
  }

  private requestCourseData() {
    const courseId = this.route.snapshot.params.courseId,
      subject = this.route.snapshot.params.subject;
    this.store.dispatch(
      new fromStore.GetCourseBySubjectAndId({ subject, courseId })
    );
    this.store.dispatch(new fromStore.GetTerms());
  }
}
