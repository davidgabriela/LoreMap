import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  hide = true;
  email = new FormControl('florian.222@gmail.com', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('123456', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login(email: string, password: string): void {
    this.authService.login(email, password);
  }
}
