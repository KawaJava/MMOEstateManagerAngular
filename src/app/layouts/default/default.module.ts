import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from 'src/app/modules/player/player.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DefaultComponent } from './default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HomepageComponent } from 'src/app/modules/public/homepage/homepage.component';
import { PlayersDetailsComponent } from 'src/app/modules/public/players/players-details/players-details.component';
import { BoroughsDetailsComponent } from 'src/app/modules/public/boroughs/boroughs-details/boroughs-details.component';
import { CountryDetailsComponent } from 'src/app/modules/public/countries/country-details/country-details.component';
import { BoroughsComponent } from 'src/app/modules/public/boroughs/boroughs-list/boroughs.component';
import { PlayersComponent } from 'src/app/modules/public/players/players-list/players.component';
import { CountriesComponent } from 'src/app/modules/public/countries/countries-list/countries.component';
import { DetailsButton } from 'src/app/modules/public/common/detailsButton';
import { PlayersMeComponent } from 'src/app/modules/public/players/players-me/players-me/players-me.component';
import { BackButtonComponent } from 'src/app/modules/public/common/back-button/back-button.component';
import { PaginationButtonsComponent } from 'src/app/modules/public/common/pagination-buttons/pagination-buttons.component';

@NgModule({
  declarations: [
    PlayerComponent,
    DefaultComponent,
    HomepageComponent,
    PlayersComponent,
    PlayersDetailsComponent,
    BoroughsComponent,
    BoroughsDetailsComponent,
    CountriesComponent,
    CountryDetailsComponent,
    DetailsButton,
    PlayersMeComponent,
    BackButtonComponent,
    PaginationButtonsComponent
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
