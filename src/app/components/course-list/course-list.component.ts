import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.StoreState>
  ) {}

  ngOnInit() {
    this.courses$ = this.store.pipe(
      select(fromStore.findCoursesEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.findCoursesLoadingSelector)
    );
    this.isError$ = this.store.pipe(select(fromStore.findCoursesErrorSelector));

    const subject = this.route.snapshot.params.subject;
    this.requestSubjectData(subject);
  }

  private requestSubjectData(subject: string) {
    this.store.dispatch(new fromStore.GetCoursesBySubject(subject));
  }
}
