import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css']
})
export class ExamScheduleComponent implements OnInit {
  @Input() course;
  examSchedule$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.StoreState>
  ) {}

  ngOnInit() {
    this.examSchedule$ = this.store.select(
      fromStore.getCourseScheduleEntitiesSelector
    );
    this.isLoading$ = this.store.select(
      fromStore.getCourseScheduleLoadingSelector
    );
    this.isError$ = this.store.select(fromStore.getCourseScheduleErrorSelector);

    const subject = this.course.subject,
      catalogNumber = this.course.catalog_number;
    this.store.dispatch(
      new fromStore.GetCourseExamSchedule({ subject, catalogNumber })
    );
  }
}
