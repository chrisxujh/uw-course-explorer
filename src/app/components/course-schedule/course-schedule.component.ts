import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { PaginationUtil } from 'src/app/utils';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css']
})
export class CourseScheduleComponent implements OnInit {
  @Input() term;
  @Input() course;
  @Input() getGetTermsLoading;
  private currentPage = 0;
  private schedule: any[];
  schedule$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(
    private store: Store<fromStore.StoreState>,
    private paginationUtil: PaginationUtil
  ) {}

  ngOnInit() {
    this.schedule$ = this.store.pipe(
      select(fromStore.getSchedulesEntitiesSelector),
      map(list => {
        this.schedule = list;
        const paginatedList = this.paginationUtil.paginateList(list, 6);
        const listToDisplay = paginatedList[this.currentPage]
          ? paginatedList[this.currentPage]
          : [];
        return { paginatedList, listToDisplay };
      })
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.getSchedulesLoadingSelector)
    );
    this.isError$ = this.store.pipe(
      select(fromStore.getSchedulesErrorSelector)
    );
    this.requestCourseScheduleData();
  }

  private requestCourseScheduleData() {
    const subject = this.course.subject,
      catalogNumber = this.course.catalog_number,
      termId = this.term.id;
    this.store.dispatch(
      new fromStore.GetCourseSchedule({ termId, subject, catalogNumber })
    );
  }

  private reloadCourseScheduleData() {
    this.store.dispatch(
      new fromStore.GetSchedulesSuccess(this.schedule.splice(0))
    );
  }

  handlePaginationEvent(newPage: number) {
    this.currentPage = newPage;
    this.reloadCourseScheduleData();
  }
}
