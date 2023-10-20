import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarPageRoutingModule } from './listar-routing.module';

import { ListarPage } from './listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarPageRoutingModule
  ],
  declarations: [ListarPage]
})
export class ListarPageModule {}
