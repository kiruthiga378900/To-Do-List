import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components
import { DashboardComponent } from './dashboard.component';

const routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Angular Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardModule { }