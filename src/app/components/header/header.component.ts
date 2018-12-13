import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  unsubscribable: Subscription;
  currentSection: string;

  ngOnInit() {
    this.unsubscribable = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentSection = this.router.routerState.snapshot.url
          .split('/')
          .filter(seg => seg !== '')[0];
      });
  }
}
