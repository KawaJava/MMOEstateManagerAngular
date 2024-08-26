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



@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminPlayerComponent,
    AdminPlayerUpdateComponent
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
