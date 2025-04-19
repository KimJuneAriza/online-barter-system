import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
 
  constructor(private router: Router) {}

  getStarted() {
    this.router.navigate(['/main/signup']);
  }

  signIn() {
    this.router.navigate(['/main/signin']);
  }
}
