import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../pages/landing/landing.component';
import { RoutesModule } from './routes.module';
import { SignupComponent } from '../pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from '../pages/signin/signin.component';



@NgModule({
  declarations: [LandingComponent, SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    RoutesModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
