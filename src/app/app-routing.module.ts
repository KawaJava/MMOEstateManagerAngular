import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PlayerComponent } from './modules/player/player.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminPlayerComponent } from './modules/admin/admin-player/admin-player.component';
import { AdminPlayerUpdateComponent } from './modules/admin/admin-player-update/admin-player-update.component';
import { AdminPlayerAddComponent } from './modules/admin/admin-player-add/admin-player-add.component';
import { AdminPlayerInactiveComponent } from './modules/admin/admin-player-inactive/admin-player-inactive.component';
import { AdminCountryComponent } from './modules/admin/admin-country/admin-country.component';
import { AdminCountryUpdateComponent } from './modules/admin/admin-country-update/admin-country-update.component';
import { AdminCountryAddComponent } from './modules/admin/admin-country-add/admin-country-add.component';
import { AdminCountryChangeSheriffComponent } from './modules/admin/admin-country-change-sheriff/admin-country-change-sheriff.component';
import { AdminHistoricalSheriffsComponent } from './modules/admin/admin-historical-sheriffs/admin-historical-sheriffs.component';
import { AdminHistoricalSheriffsFilteredComponent } from './modules/admin/admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.component';
import { AdminBoroughComponent } from './modules/admin/admin-borough/admin-borough.component';
import { AdminBoroughAddComponent } from './modules/admin/admin-borough-add/admin-borough-add.component';
import { AdminBoroughUpdateComponent } from './modules/admin/admin-borough-update/admin-borough-update.component';
import { AdminBoroughChangeLeaderComponent } from './modules/admin/admin-borough-change-leader/admin-borough-change-leader.component';
import { AdminHistoricalLeadersComponent } from './modules/admin/admin-historical-leaders/admin-historical-leaders.component';

const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: 'players', component: PlayerComponent}
    ]
  },
  {
    path:'', component: FullpageadminComponent, children: [
      {path: 'admin', component: AdminComponent},
      {path: 'admin/players', component: AdminPlayerComponent},
      {path: 'admin/players/update/:id', component: AdminPlayerUpdateComponent},
      {path: 'admin/players/add', component: AdminPlayerAddComponent},
      {path: 'admin/players/inactive', component: AdminPlayerInactiveComponent},
      {path: 'admin/countries', component: AdminCountryComponent},
      {path: 'admin/countries/update/:id', component: AdminCountryUpdateComponent},
      {path: 'admin/countries/add', component: AdminCountryAddComponent},
      {path: 'admin/countries/:id/changeSheriff', component: AdminCountryChangeSheriffComponent},
      {path: 'admin/historical-sheriffs', component: AdminHistoricalSheriffsComponent},
      {path: 'admin/historical-sheriffs/filtered', component: AdminHistoricalSheriffsFilteredComponent},
      {path: 'admin/boroughs', component: AdminBoroughComponent},
      {path: 'admin/boroughs/add', component: AdminBoroughAddComponent},
      {path: 'admin/boroughs/update/:id', component: AdminBoroughUpdateComponent},
      {path: 'admin/boroughs/:id/changeLeader', component: AdminBoroughChangeLeaderComponent},
      {path: 'admin/historical-leaders', component: AdminHistoricalLeadersComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
