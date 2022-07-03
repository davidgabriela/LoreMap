import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  sendResetEmail(email: string): void {
    if (this.userExists(email)) console.log(`Send reset email to ${email}`);
    else console.log(`There is no account with this email`);
  }

  userExists(email: string): boolean {
    console.log(`Check if ${email} exists in DB`);
    return true;
  }
}
