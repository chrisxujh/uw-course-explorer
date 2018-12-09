import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { map } from '../../../../node_modules/rxjs/operators';

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
    this.course$ = this.store.select(fromStore.findCoursesEntitiesSelector);
    this.isLoading$ = this.store.select(fromStore.findCoursesLoadingSelector);
    this.isError$ = this.store.select(fromStore.findCoursesErrorSelector);

    const courseId = this.route.snapshot.params.courseId,
      subject = this.route.snapshot.params.subject;
    this.requestCourseData(subject, courseId);
  }

  private requestCourseData(subject: string, courseId: string) {
    this.store.dispatch(
      new fromStore.GetCourseBySubjectAndId({ subject, courseId })
    );
  }
}
