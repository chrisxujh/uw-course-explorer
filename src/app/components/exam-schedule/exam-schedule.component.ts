import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css']
})
export class ExamScheduleComponent implements OnInit {
  examSchedule$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.examSchedule$ = this.store.pipe(
      select(fromStore.getSchedulesEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getSchedulesLoadingSelector)
    );
    this.isError$ = this.store.pipe(
      select(fromStore.getSchedulesErrorSelector)
    );
  }
}
