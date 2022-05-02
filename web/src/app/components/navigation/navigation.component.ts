import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  sectionName = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd
        ? this.setPageName(event.url.replace('/', ''))
        : null;
    });
  }

  setPageName(name: String): void {
    switch (name) {
      case 'lore-collection':
        this.sectionName = 'My collection';
        break;
      case 'profile':
        this.sectionName = 'Profile';
        break;
      default:
        this.sectionName = 'Profile';
        break;
    }
  }
}
