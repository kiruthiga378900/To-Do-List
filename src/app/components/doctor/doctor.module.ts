import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: DoctorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorModule { }

// Placeholder component - to be implemented
class DoctorComponent {}