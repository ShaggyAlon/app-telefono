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


  constructor(private dbService: DbService, private router: Router, private apiService: ApiService, private sesionService:SesionService) { }

  ngOnInit() {
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    });
  }

  volver() {
    this.router.navigate(['login'])
  }

  async almacenarPersona() {
// VALIDACION DE EXISTENCIA MAOMA
    let usuarioExistente = false;
    let correoExistente = false;

    for (let i = 0; i < this.lista_personas.length; i++) {
      if (this.lista_personas[i].USUARIO === this.mdl_usuario) {
        usuarioExistente = true;
      }
      if (this.lista_personas[i].EMAIL === this.mdl_email) {
        correoExistente = true;
      }
    }
    // ALMACENAR DATOS EN API DE PROFE
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    let data = this.apiService.personaAlmacenar(
      this.mdl_nombre,
      this.mdl_apellido,
      this.mdl_usuario,
      this.mdl_email,
      this.mdl_contrasena);
// PROCESAR RESPUESTA JSON
    let respuesta = await lastValueFrom(data);
    let json = JSON.stringify(respuesta);
    let jsonProcesado = JSON.parse(json);


    for (let x = 0; x < jsonProcesado["result"].length; x++) {
      this.lista_respuesta.push(jsonProcesado["result"][x]);

      // SI NO HAY DUPLICADOS SE ALMACENA EN TABLA PERSONA
      if (this.mdl_usuario != '' && this.mdl_email != '' && this.mdl_contrasena != '' && this.mdl_nombre != '' && this.mdl_apellido != '') {
        if (!usuarioExistente && !correoExistente &&
          this.lista_respuesta[x]["RESPUESTA"] == "OK") {
          this.dbService.almacenarPersona(
            this.mdl_nombre,
            this.mdl_apellido,
            this.mdl_email,
            this.mdl_usuario,
            this.mdl_contrasena

          );
          // ALGO FUNCIONA PARA MATENER LA MALDITA SESION
          // console.log('se agrego una sesion')
          // this.sesionService.nuevaSesion(
          //   this.mdl_usuario,
          //   this.mdl_email,
          //   this.vigente
          // );

          this.router.navigate(['login'], parametros);
// RESPUESTA DE DUPLICACION
        } else {
          if (this.lista_respuesta[x]["RESPUESTA"] == "ERR01" || usuarioExistente) {
            this.isAlertOpenDuplicado = true;
          } else if (this.lista_respuesta[x]["RESPUESTA"] == "ERR02" || correoExistente) {
            this.isAlertOpenEmail= true;
          }

        }
// ALERTA CAMPOS VACIOS
      } else {
        this.isAlertOpen = true;
      }

    }

  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}

