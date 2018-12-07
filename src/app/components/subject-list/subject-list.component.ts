import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects$: Observable<any>;
  isLoading$: Observable<any>;
  isError$: Observable<any>;

  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.subjects$ = this.store.pipe(
      select(fromStore.findCoursesEntitiesSelector)
    );
    this.isLoading$ = this.store.pipe(
      select(fromStore.findCoursesLoadingSelector)
    );
    this.isError$ = this.store.pipe(select(fromStore.findCoursesErrorSelector));

    this.requestSubjectData();
  }

  requestSubjectData() {
    this.store.dispatch(new fromStore.GetSubjects());
  }
}
