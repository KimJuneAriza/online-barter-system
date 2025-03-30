import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signinForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get username() {
    return this.signinForm.get('username');
  }

  get password() {
    return this.signinForm.get('password');
  }

  constructor(private router: Router, private userService: UserService) {}

  signinError: string = '';
  onSubmit() {
    if (this.signinForm.invalid) {
      this.signinError = 'Please enter valid credentials.';
      return;
    }

    this.userService.userSignin(this.signinForm.value).subscribe({
      next: (response) => {
        console.log('Signin Successful: ', response);
        this.router.navigate(['/main/dashboard']);
      },
      error: (error) => {
        console.log('Signin Error: ', error);
        this.signinError = 'Invalid username or password.';
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/main/signup']);
  }
}
