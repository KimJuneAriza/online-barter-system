import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../pages/landing/landing.component';
import { RoutesModule } from './routes.module';
import { SignupComponent } from '../pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from '../pages/signin/signin.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AddItemComponent } from '../pages/add-item/add-item.component';
import { MaterialModule } from './material.module';
import { ConfirmLogoutDialogComponent } from '../shared/confirm-logout-dialog/confirm-logout-dialog.component';
import { CompleteProfileComponent } from '../pages/complete-profile/complete-profile.component';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    LandingComponent,
    SignupComponent,
    SigninComponent,
    SpinnerComponent,
    DashboardComponent,
    AddItemComponent,
    ConfirmLogoutDialogComponent,
    CompleteProfileComponent
  ],
  imports: [
    CommonModule,
    RoutesModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    // NoopAnimationsModule
  ]
})
export class MainModule { }
