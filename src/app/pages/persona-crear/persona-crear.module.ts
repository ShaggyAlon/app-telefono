import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaCrearPageRoutingModule } from './persona-crear-routing.module';

import { PersonaCrearPage } from './persona-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaCrearPageRoutingModule
  ],
  declarations: [PersonaCrearPage]
})
export class PersonaCrearPageModule {}
