import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from 'src/app/modules/player/player.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DefaultComponent } from './default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HomepageComponent } from 'src/app/modules/public/homepage/homepage.component';
import { PlayersComponent } from 'src/app/modules/public/players/list/players/players.component';
import { PlayersDetailsComponent } from 'src/app/modules/public/players/players-details/players-details.component';
import { BoroughsComponent } from 'src/app/modules/public/boroughs/list/boroughs/boroughs.component';

@NgModule({
  declarations: [
    PlayerComponent,
    DefaultComponent,
    HomepageComponent,
    PlayersComponent,
    PlayersDetailsComponent,
    BoroughsComponent
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
