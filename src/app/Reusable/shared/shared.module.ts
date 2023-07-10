import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//AngularMaterials's components
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; //input, text areas, text,numeric,email 
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; //previo loading
import { MatGridListModule } from '@angular/material/grid-list';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';//sidebar menu and navbar
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'; //models alerts
import { MatSnackBarModule } from '@angular/material/snack-bar';//small alerts
import { MatTooltipModule } from '@angular/material/tooltip'; // cursor over an element small alert
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';//to change the date format

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
