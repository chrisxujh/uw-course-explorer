import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css']
})
export class CourseScheduleComponent implements OnInit {
  @Input() termId;
  schedule$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.schedule$ = this.store.select(fromStore.getSchedulesEntitiesSelector);
    this.isLoading$ = this.store.select(fromStore.getSchedulesLoadingSelector);
    this.isError$ = this.store.select(fromStore.getSchedulesErrorSelector);
  }
}
