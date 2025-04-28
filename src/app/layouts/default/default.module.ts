import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from 'src/app/modules/player/player.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DefaultComponent } from './default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [
    PlayerComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DefaultModule { }
