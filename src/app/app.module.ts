import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CourseComponent } from './components/course/course.component';
import { CourseScheduleComponent } from './components/course-schedule/course-schedule.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseMetaComponent } from './components/course-meta/course-meta.component';
import { HeaderComponent } from './components/header/header.component';
import { ExamScheduleComponent } from './components/exam-schedule/exam-schedule.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SubjectComponent } from './components/subject/subject.component';
import { CoursesComponent } from './components/courses/courses.component';
import { services } from './services';

import * as fromCourseExplorerReducers from './store/reducers';
import * as fromCourseExplorerEffects from './store/effects';

const routes: Routes = [
  { path: '', redirectTo: '/subjects', pathMatch: 'full' },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/:subject', component: SubjectComponent },
  { path: 'subjects/:subject/:courseId', component: CourseComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    CourseListComponent,
    PageNotFoundComponent,
    CourseComponent,
    CourseScheduleComponent,
    FooterComponent,
    CourseMetaComponent,
    HeaderComponent,
    ExamScheduleComponent,
    SpinnerComponent,
    SearchBarComponent,
    SubjectComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(fromCourseExplorerReducers.reducers),
    EffectsModule.forRoot(fromCourseExplorerEffects.effects)
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule {}
