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

  sectionNames: Map<string, string> = new Map([
    ['login', 'Login'],
    ['register', 'Register'],
    ['forgot-password', 'Forgot password'],
    ['reset-password', 'Reset password'],
    ['lore-collection', 'Lore collection'],
    ['main', 'Main Page of { Lore title }'],
    ['map-upload', 'Upload map'],
    ['maps', ''],
    ['timelines', 'Timelines'],
    ['', ''],
  ]);

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
        if (params.length > 2) {
          this.setPageName(params[3]);
          this.loreId = params[2];
        } else {
          this.setPageName(params[1]);
        }
      } else null;
    });
  }

  setPageName(name: string): void {
    this.sectionName = this.sectionNames.get(name) ?? '';
  }

  logout() {
    this.authService.logout();
  }
}
