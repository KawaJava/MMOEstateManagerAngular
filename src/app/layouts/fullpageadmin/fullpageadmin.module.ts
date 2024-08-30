import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageadminComponent } from './fullpageadmin.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AdminPlayerComponent } from 'src/app/modules/admin/admin-player/admin-player.component';
import { AdminPlayerUpdateComponent } from 'src/app/modules/admin/admin-player-update/admin-player-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPlayerAddComponent } from 'src/app/modules/admin/admin-player-add/admin-player-add.component';
import { AdminPlayerInactiveComponent } from 'src/app/modules/admin/admin-player-inactive/admin-player-inactive.component';
import { AdminConfirmDialogComponent } from 'src/app/modules/admin/admin-confirm-dialog/admin-confirm-dialog.component';
import { AdminCountryComponent } from 'src/app/modules/admin/admin-country/admin-country.component';
import { AdminCountryUpdateComponent } from 'src/app/modules/admin/admin-country-update/admin-country-update.component';
import { AdminCountryAddComponent } from 'src/app/modules/admin/admin-country-add/admin-country-add.component';
import { AdminCountryChangeSheriffComponent } from 'src/app/modules/admin/admin-country-change-sheriff/admin-country-change-sheriff.component';
import { AdminHistoricalSheriffsComponent } from 'src/app/modules/admin/admin-historical-sheriffs/admin-historical-sheriffs.component';
import { AdminHistoricalSheriffsFilteredComponent } from 'src/app/modules/admin/admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.component';
import { AdminBoroughComponent } from 'src/app/modules/admin/admin-borough/admin-borough.component';
import { AdminBoroughAddComponent } from 'src/app/modules/admin/admin-borough-add/admin-borough-add.component';
import { AdminBoroughUpdateComponent } from 'src/app/modules/admin/admin-borough-update/admin-borough-update.component';
import { AdminBoroughChangeLeaderComponent } from 'src/app/modules/admin/admin-borough-change-leader/admin-borough-change-leader.component';



@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminPlayerComponent,
    AdminPlayerUpdateComponent,
    AdminPlayerAddComponent,
    AdminPlayerInactiveComponent,
    AdminConfirmDialogComponent,
    AdminCountryComponent,
    AdminCountryUpdateComponent,
    AdminCountryAddComponent,
    AdminCountryChangeSheriffComponent,
    AdminHistoricalSheriffsComponent,
    AdminHistoricalSheriffsFilteredComponent,
    AdminBoroughComponent,
    AdminBoroughAddComponent,
    AdminBoroughUpdateComponent,
    AdminBoroughChangeLeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminModule { }
