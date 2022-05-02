import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Lores', cols: 2, rows: 2 },
          { title: 'Friends List', cols: 2, rows: 2 },
        ];
      }

      return [
        { title: 'Lores', cols: 1, rows: 2 },
        { title: 'Friends List', cols: 1, rows: 2 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
