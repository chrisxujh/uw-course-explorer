import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
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
  selectedTermId: string;
  currentMeta: string;
  terms$: Observable<any>;
  isLoading$: Observable<any>;
  unsusbscribable: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.StoreState>
  ) {}

  ngOnInit() {
    this.terms$ = this.store.select(fromStore.getTermsEntitiesSelector);
    this.isLoading$ = this.store.select(fromStore.getTermsLoadingSelector);
    this.unsusbscribable = this.terms$
      .pipe(filter(data => data.current_term))
      .subscribe(terms => this.handleCourseSchedule(terms.current_term.id));
    this.store.dispatch(new fromStore.GetTerms());
  }

  ngOnDestroy() {
    this.unsusbscribable.unsubscribe();
  }

  handleCourseSchedule(termId: string) {
    this.selectedTermId = termId;
    this.currentMeta = this.COURSE_SCHEDULE_META;
  }

  handleNextTermCourseSchedule(termId: string) {
    this.selectedTermId = termId;
    this.currentMeta = this.NEXT_TERM_SCHEDULE_META;
  }

  handleExamSchedule() {
    this.currentMeta = this.EXAM_SCHEDULE_META;
  }
}
