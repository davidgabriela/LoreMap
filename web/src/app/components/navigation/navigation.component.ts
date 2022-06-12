import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  sectionName = '';
  fullUrl = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.fullUrl = event.url;
        this.setPageName(event.url.split('/')[1]);
      } else null;
    });
  }

  setPageName(name: String): void {
    switch (name) {
      case 'login':
        this.sectionName = 'Login';
        break;
      case 'lore-collection':
        this.sectionName = 'My collection';
        break;
      case 'map-upload':
        this.sectionName = 'Upload map';
        break;
      case 'write':
        this.sectionName = '{ Lore title }';
        break;
      case 'map':
        this.sectionName = '{ Map title }';
        break;
      default:
        this.sectionName = 'NA';
        break;
    }
    console.log('PAGE NAME:', this.sectionName);
  }

  logout() {
    this.authService.logout();
  }
}
