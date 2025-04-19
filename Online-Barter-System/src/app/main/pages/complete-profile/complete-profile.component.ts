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

  profileForm: FormGroup = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
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
