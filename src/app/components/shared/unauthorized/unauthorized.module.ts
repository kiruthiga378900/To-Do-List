import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components
import { UnauthorizedComponent } from './unauthorized.component';

const routes = [
  { path: '', component: UnauthorizedComponent }
];

@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Angular Material Modules
    MatButtonModule,
    MatIconModule
  ]
})
export class UnauthorizedModule { }