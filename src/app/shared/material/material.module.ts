import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatBadgeModule,
    MatRadioModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatBadgeModule,
    MatRadioModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],

})
export class MaterialModule { }
