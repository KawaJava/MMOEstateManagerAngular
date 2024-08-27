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
      {path: 'admin/countries/add', component: AdminCountryAddComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
