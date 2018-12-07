import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css']
})
export class CourseScheduleComponent implements OnInit {
  @Input() course;
  schedule$: Observable<any>;
  isLoading$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.StoreState>
  ) {}

  ngOnInit() {
    this.schedule$ = this.store.pipe(
      select(fromStore.getCourseScheduleEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getCourseScheduleLoadingSelector)
    );

    const subject = this.course.subject,
      catalogNumber = this.course.catalog_number;
    this.store.dispatch(
      new fromStore.GetCourseSchedule({ subject, catalogNumber })
    );
  }
}
