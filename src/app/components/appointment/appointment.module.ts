import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: AppointmentComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AppointmentModule { }

// Placeholder component - to be implemented
class AppointmentComponent {}