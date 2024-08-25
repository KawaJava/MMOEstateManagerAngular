import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PlayerComponent } from './modules/player/player.component';

const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: 'players', component: PlayerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
