import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private authService: AuthService, private location: Location) {}
  ngOnInit(): void {
    this.wasReset.next(null);
  }

  hide = true;
  password = new FormControl('', [Validators.required]);
  wasReset: Subject<any> = new Subject();

  resetPassword(password: string): void {
    // Get token
    const token = this.location.path().split('/')[2];
    this.authService.resetPassword(token, password).subscribe(
      (res) => {
        console.log(res);
        this.wasReset.next(true);
      },
      (err) => {
        this.wasReset.next(false);
      }
    );
  }
}
