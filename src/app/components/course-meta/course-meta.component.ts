import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromStore from '../../store';

@Component({
  selector: 'app-course-meta',
  templateUrl: './course-meta.component.html',
  styleUrls: ['./course-meta.component.css']
})
export class CourseMetaComponent implements OnInit, OnDestroy {
  COURSE_SCHEDULE_META = 'courseSchedule';
  NEXT_TERM_SCHEDULE_META = 'nextTermSchedule';
  EXAM_SCHEDULE_META = 'examSchedule';

  @Input() course: any;
  currentMeta: string;
  terms$: Observable<any>;
  isLoading$: Observable<any>;
  unsusbscribable: Subscription;

  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.terms$ = this.store.select(fromStore.getTermsEntitiesSelector);
    this.isLoading$ = this.store.select(fromStore.getTermsLoadingSelector);
    this.unsusbscribable = this.terms$
      .pipe(filter(data => data.current_term))
      .subscribe(terms => this.handleCourseSchedule(terms.current_term.id));
  }

  ngOnDestroy() {
    this.unsusbscribable.unsubscribe();
  }

  handleCourseSchedule(termId: string) {
    this.requestCourseScheduleData(termId);
    this.currentMeta = this.COURSE_SCHEDULE_META;
  }

  handleNextTermCourseSchedule(termId: string) {
    this.requestCourseScheduleData(termId);
    this.currentMeta = this.NEXT_TERM_SCHEDULE_META;
  }

  handleExamSchedule() {
    this.requestExamScheduleData();
    this.currentMeta = this.EXAM_SCHEDULE_META;
  }

  private requestCourseScheduleData(termId: string) {
    const subject = this.course.subject,
      catalogNumber = this.course.catalog_number;
    this.store.dispatch(
      new fromStore.GetCourseSchedule({ termId, subject, catalogNumber })
    );
  }

  private requestExamScheduleData() {
    const subject = this.course.subject,
      catalogNumber = this.course.catalog_number;
    this.store.dispatch(
      new fromStore.GetCourseExamSchedule({ subject, catalogNumber })
    );
  }
}
