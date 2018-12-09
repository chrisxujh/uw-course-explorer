import { Component, OnInit, Input } from '@angular/core';
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
  @Input() termId;
  schedule$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.schedule$ = this.store.pipe(
      select(fromStore.getCourseScheduleEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getCourseScheduleLoadingSelector)
    );
    this.isError$ = this.store.pipe(
      select(fromStore.getCourseScheduleErrorSelector)
    );

    const subject = this.course.subject,
      catalogNumber = this.course.catalog_number,
      termId = this.termId;
    this.store.dispatch(
      new fromStore.GetCourseSchedule({ termId, subject, catalogNumber })
    );

    this.schedule$.subscribe(data => console.log(data));
  }
}
