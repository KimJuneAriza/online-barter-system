import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{

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

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {}

  signinMessage: string = '';
  ngOnInit() {
    // Read query parameters to see if there's a notification message
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.signinMessage = params['message'];
      }
    });
  }

  loading: boolean = false;
  signinError: string = '';
  onSubmit() {

    this.signinMessage = '';
    if (this.signinForm.invalid) {
      this.signinError = 'Please enter valid credentials.';
      return;
    }

    this.loading = true;

    this.userService.userSignin(this.signinForm.value).subscribe({
      next: (response) => {
        console.log('Signin Successful: ', response);
        this.loading = false;
        if(response.user.complete_profile){
          this.router.navigate(['main/dashboard']);
        }
        else {
          this.router.navigate(['/main/profile']);
        }
        
      },
      error: (error) => {
        console.log('Signin Error: ', error);
        this.loading = false;
        this.signinError = 'Invalid username or password.';
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/main/signup']);
  }
}
