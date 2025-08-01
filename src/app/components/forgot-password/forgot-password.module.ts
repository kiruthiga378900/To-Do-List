import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: ForgotPasswordComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }

// Placeholder component - to be implemented
class ForgotPasswordComponent {}