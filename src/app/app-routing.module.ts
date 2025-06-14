import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminPlayerComponent } from './modules/admin/admin-player-all/admin-player/admin-player.component';
import { AdminPlayerAddComponent } from './modules/admin/admin-player-all/admin-player-add/admin-player-add.component';
import { AdminCountryUpdateComponent } from './modules/admin/admin-country-all/admin-country-update/admin-country-update.component';
import { AdminCountryAddComponent } from './modules/admin/admin-country-all/admin-country-add/admin-country-add.component';
import { AdminCountryChangeSheriffComponent } from './modules/admin/admin-country-all/admin-country-change-sheriff/admin-country-change-sheriff.component';
import { AdminHistoricalSheriffsComponent } from './modules/admin/admin-historical-sheriffs/admin-historical-sheriffs.component';
import { AdminHistoricalSheriffsFilteredComponent } from './modules/admin/admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.component';
import { AdminBoroughComponent } from './modules/admin/admin-borough-all/admin-borough/admin-borough.component';
import { AdminBoroughUpdateComponent } from './modules/admin/admin-borough-all/admin-borough-update/admin-borough-update.component';
import { AdminHistoricalLeadersComponent } from './modules/admin/admin-historical-leaders/admin-historical-leaders.component';
import { AdminHistoricalLeadersFilteredComponent } from './modules/admin/admin-historical-leaders-filtered/admin-historical-leaders-filtered.component';
import { AdminGoldHistoryComponent } from './modules/admin/admin-gold-history/admin-gold-history.component';
import { AdminGoldHistoryFilteredComponent } from './modules/admin/admin-gold-history-filtered/admin-gold-history-filtered.component';
import { AdminLoginComponent } from './layouts/fullpageadminlogin/admin-login/admin-login.component';
import { AdminAuthorizeGuard } from './modules/common/guard/adminAuthorizeGuard';
import { RegisterComponent } from './modules/admin/admin-register/register/register.component';
import { GoldInBoroughComponent } from './modules/admin/charts/gold-in-borough/gold-in-borough.component';
import { PlayersIsCountryComponent } from './modules/admin/charts/players-is-country/players-is-country.component';
import { ClansIsCountryComponent } from './modules/admin/charts/clans-is-country/clans-is-country.component';
import { HomepageComponent } from './modules/public/homepage/homepage.component';
import { PlayersDetailsComponent } from './modules/public/players/players-details/players-details.component';
import { BoroughsDetailsComponent } from './modules/public/boroughs/boroughs-details/boroughs-details.component';
import { CountryDetailsComponent } from './modules/public/countries/country-details/country-details.component';
import { BoroughsComponent } from './modules/public/boroughs/boroughs-list/boroughs.component';
import { PlayersComponent } from './modules/public/players/players-list/players.component';
import { CountriesComponent } from './modules/public/countries/countries-list/countries.component';
import { AdminPlayerReviewsComponent } from './modules/admin/admin-player-reviews/admin-player-reviews/admin-player-reviews.component';
import { AdminPlayerReviewsToAcceptComponent } from './modules/admin/admin-player-reviews/admin-player-reviews-to-accept/admin-player-reviews-to-accept.component';
import { AdminBoroughAddComponent } from './modules/admin/admin-borough-all/admin-borough-add/admin-borough-add.component';
import { AdminBoroughChangeLeaderComponent } from './modules/admin/admin-borough-all/admin-borough-change-leader/admin-borough-change-leader.component';
import { AdminCountryComponent } from './modules/admin/admin-country-all/admin-country/admin-country.component';
import { AdminPlayerInactiveComponent } from './modules/admin/admin-player-all/admin-player-inactive/admin-player-inactive.component';
import { AdminPlayerUpdateComponent } from './modules/admin/admin-player-all/admin-player-update/admin-player-update.component';
import { PlayersMeComponent } from './modules/public/players/players-me/players-me/players-me.component';


const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: '', component: HomepageComponent},
      {path: 'players', component: PlayersComponent},
      {path: 'players/:slug', component: PlayersDetailsComponent},
      {path: 'players-me', component: PlayersMeComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'boroughs', component: BoroughsComponent},
      {path: 'boroughs/:slug', component: BoroughsDetailsComponent},
      {path: 'countries', component: CountriesComponent},
      {path: 'countries/:slug', component: CountryDetailsComponent}
    ]
  },
  {
    path:'', component: AdminLoginComponent, children: [
      {path: 'admin-login', component: AdminLoginComponent}
    ]
  },
  {
    path:'', component: FullpageadminComponent, children: [
      {path: 'admin', component: AdminComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/players', component: AdminPlayerComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/players/update/:id', component: AdminPlayerUpdateComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/players/add', component: AdminPlayerAddComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/players/inactive', component: AdminPlayerInactiveComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/countries', component: AdminCountryComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/countries/update/:id', component: AdminCountryUpdateComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/countries/add', component: AdminCountryAddComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/countries/:id/changeSheriff', component: AdminCountryChangeSheriffComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/historical-sheriffs', component: AdminHistoricalSheriffsComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/historical-sheriffs/filtered', component: AdminHistoricalSheriffsFilteredComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/boroughs', component: AdminBoroughComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/boroughs/add', component: AdminBoroughAddComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/boroughs/update/:id', component: AdminBoroughUpdateComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/boroughs/:id/changeLeader', component: AdminBoroughChangeLeaderComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/historical-leaders', component: AdminHistoricalLeadersComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/historical-leaders/filtered', component: AdminHistoricalLeadersFilteredComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/history-golds', component: AdminGoldHistoryComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/history-golds/filtered', component: AdminGoldHistoryFilteredComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/register', component: RegisterComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/charts/gold-in-borough', component: GoldInBoroughComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/charts/players-in-country', component: PlayersIsCountryComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/charts/clans-in-country', component: ClansIsCountryComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/player-reviews', component: AdminPlayerReviewsComponent, canActivate: [AdminAuthorizeGuard]},
      {path: 'admin/player-reviews-to-accept', component: AdminPlayerReviewsToAcceptComponent, canActivate: [AdminAuthorizeGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
