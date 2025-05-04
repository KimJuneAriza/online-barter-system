import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-complete-profile',
  standalone: false,
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.css'
})
export class CompleteProfileComponent {
  
  selectedFile: File | null = null;
  fileTouched = false;
  showError = false;

  profileForm: FormGroup = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  get full_name(){
    return this.profileForm.get('full_name');
  }
  get phone(){
    return this.profileForm.get('phone');
  }
  get gender(){
    return this.profileForm.get('gender');
  }
  get dob(){
    return this.profileForm.get('dob');
  }
  get address(){
    return this.profileForm.get('address');
  }

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  onFileChange(event: any) {
    this.fileTouched = true;
    const file = event.target.files[0];
    this.selectedFile = file || null;
    this.showError = !file;
  }
  onBlur(): void {
    this.fileTouched = true;
    if (!this.selectedFile) {
      this.showError = true;
    }
  }
  
  loading: boolean = false;
  onSubmit() {
    this.loading = true;
    const formData = new FormData();
    
    Object.entries(this.profileForm.value).forEach(([key, value]) =>
    {
      console.log(`Appending: ${key} = ${value}`);
      formData.append(key, value as string)
    }
      
    );

    const currentUser = this.userService.getCurrentUser();
    
    if (currentUser && currentUser.id) {
      formData.append('user_id', currentUser.id); 
    }

    if (this.selectedFile) {
      formData.append('profile_photo', this.selectedFile);
    }

    this.userService.completeProfile(formData).subscribe({
      next: (response) => {
        console.log('Profile updated:', response);
        this.router.navigate(['/main/dashboard']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }
}
