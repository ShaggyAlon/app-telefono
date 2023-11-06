import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarContrasenaPage } from './cambiar-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarContrasenaPageRoutingModule {}
