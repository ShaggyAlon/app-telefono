import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-persona-crear',
  templateUrl: './persona-crear.page.html',
  styleUrls: ['./persona-crear.page.scss'],
})
export class PersonaCrearPage implements OnInit {
  // VARIABLES
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_usuario: string = '';
  mdl_email: string = '';
  mdl_contrasena: string = '';

  // ALERTA
  isAlertOpen = false;
  isAlertOpenDuplicado = false;
  isAlertOpenEmail = false;

  alertButtons = ['OK'];
  mdl_message: string = '';

  lista_personas: Persona[] = [];
  lista_respuesta: any[] = [];

  // PARA PASAR PARAMETROS
  usuario: string = '';
  apellido: string = '';
  contra: string = '';
  vigente: string = '';


  constructor(private dbService: DbService, 
              private router: Router, 
              private apiService: ApiService) { }

  ngOnInit() {
    this.dbService.dbObtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    });
  }

  async almacenarPersona(){
    if (this.mdl_usuario != '' && this.mdl_email != '' && this.mdl_contrasena != '' && this.mdl_nombre != '' && this.mdl_apellido != '') {

      let persona = new Persona(this.mdl_nombre, this.mdl_apellido, this.mdl_usuario, this.mdl_email, this.mdl_contrasena);

      let data = this.apiService.apiPersonaAlmacenar(persona);
      let respuesta = await lastValueFrom(data);
      let json = JSON.stringify(respuesta);
      let jsonProcesado = JSON.parse(json);
      
      for (let x = 0; x < jsonProcesado["result"].length; x++) {
        this.lista_respuesta.push(jsonProcesado["result"][x]);
        if (this.lista_respuesta[x]["RESPUESTA"] == "OK") {

          this.dbService.dbAlmacenarPersona(persona);

          let parametros: NavigationExtras = {
            replaceUrl: true
          }
          this.router.navigate(['login'], parametros);

        } else {
          if (this.lista_respuesta[x]["RESPUESTA"] == "ERR01") {
            this.isAlertOpenDuplicado = true;
          } else if (this.lista_respuesta[x]["RESPUESTA"] == "ERR02") {
            this.isAlertOpenEmail = true;
          }
        }
      }
    } else{
      this.isAlertOpen = true;
    }
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}

