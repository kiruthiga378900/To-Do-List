import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }

// Placeholder component - to be implemented
class RegisterComponent {}