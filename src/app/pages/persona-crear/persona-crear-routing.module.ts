import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaCrearPage } from './persona-crear.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaCrearPageRoutingModule {}
