import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.foundEmail.next(null);
    console.log(this.foundEmail);
  }

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  foundEmail: Subject<any> = new Subject();
  submittedEmail = false;
  resetEmail = '';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  sendResetEmail(email: string): void {
    this.submittedEmail = true;
    this.resetEmail = email;
    this.foundEmail.next(null);
    this.authService.forgotPassword(email).subscribe(
      (result) => {
        console.log('RESS:', result);
        if (result.success) {
          this.foundEmail.next(true);
        }
      },
      (error) => {
        this.foundEmail.next(false);
      },
      () => {}
    );
  }
}
