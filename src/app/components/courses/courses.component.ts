import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(private store: Store<fromStore.StoreState>) {}

  ngOnInit() {
    this.requestCoursesData();
  }

  private requestCoursesData() {
    this.store.dispatch(new fromStore.GetCourses());
  }
}
