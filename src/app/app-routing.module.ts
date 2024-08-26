import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PlayerComponent } from './modules/player/player.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminPlayerComponent } from './modules/admin/admin-player/admin-player.component';

const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: 'players', component: PlayerComponent}
    ]
  },
  {
    path:'', component: FullpageadminComponent, children: [
      {path: 'admin', component: AdminComponent},
      {path: 'admin/players', component: AdminPlayerComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
