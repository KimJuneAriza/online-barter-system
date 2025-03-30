import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordStrengthValidator // Custom Validator for Password
    ]),
    confirm: new FormControl('', [Validators.required])
  }, { validators: this.passwordsMatchValidator }); // Custom Validator for Confirm Password

  // Password Strength Validator
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_,.?":{}|<>]/.test(password);

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return isValid ? null : { passwordStrength: true };
  }

  // Confirm Password Validator
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;

    return password === confirm ? null : { passwordsMismatch: true };
  }
  
  get username(){
    return this.signupForm.get('username');
  }
  get email(){
    return this.signupForm.get('email');
  }
  get password(){
    return this.signupForm.get('password');
  }
  get confirm(){
    return this.signupForm.get('confirm');
  }
  constructor(private router: Router, private userService: UserService) {}

  loading: boolean = false;
  signupError: string ='';
  errorMessage: any;
  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupError = 'Please enter valid credentials.';
      return;
    }
    this.loading = true;
    this.userService.userSignup(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup Successful: ', response);
        this.loading = false;
        // this.router.navigate(['/main/signin'])
        this.router.navigate(['/main/signin'], {
          queryParams: { message: 'Your account has been created successfully.' }
        });
      },
      error: (error) => {
        console.log('Signup Error: ', error);
          this.loading = false;
          this.signupError = 'Signup Failed.';
          this.errorMessage = error.error.errors;   
      }
    })
  }

  navigateToSignin() {
    this.router.navigate(['/main/signin']);
  }
}
