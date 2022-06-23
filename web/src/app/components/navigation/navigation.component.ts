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
  loreId = '';

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
        this.fullUrl = event.url;
        const params = event.url.split('/');
        if (params[1] === 'lore-collection' && params.length > 2) {
          this.setPageName(params[3]);
          this.loreId = params[2];
        } else {
          this.setPageName(params[1]);
        }
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
      case 'main':
        this.sectionName = 'Main Page of { Lore title }';
        break;
      case 'maps':
        this.sectionName = '{ Map title }';
        break;
      case 'documents':
        this.sectionName = '{ Document title }';
        break;
      default:
        this.sectionName = '[ UNKNOWN ]';
        break;
    }
  }

  logout() {
    this.authService.logout();
  }
}
