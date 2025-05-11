import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { SigninComponent } from '../pages/signin/signin.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { userGuard } from '../guards/user.guard';
import { GuestGuard } from '../guards/guest.guard';
import { CompleteProfileComponent } from '../pages/complete-profile/complete-profile.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'profile',
    component: CompleteProfileComponent,
    // canActivate: [GuestGuard]
  },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [userGuard]
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RoutesModule { }
