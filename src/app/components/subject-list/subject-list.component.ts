import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ConfigService } from '../../services/config.service';

import * as fromStore from '../../store';
import {
  filter,
  map,
  catchError
} from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;
  popularSubjects$: Observable<any>;

  constructor(
    private store: Store<fromStore.StoreState>,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.subjects$ = this.store.pipe(
      select(fromStore.findCoursesEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.findCoursesLoadingSelector)
    );
    this.isError$ = this.store.pipe(select(fromStore.findCoursesErrorSelector));
    this.requestSubjectData();
    this.popularSubjects$ = this.configService
      .getPopularSubjects()
      .pipe(catchError(() => of([])));
  }

  requestSubjectData() {
    this.store.dispatch(new fromStore.GetSubjects());
  }
}
