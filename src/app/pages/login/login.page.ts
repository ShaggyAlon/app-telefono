import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Persona } from 'src/app/models/persona.model';
import { Sesion } from 'src/app/models/sesion.model';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //VARIABLES
  mdl_usuario: string = '';
  mdl_contra: string = '';
  // usuarioRegistrado: string = '';
  // contraRegistrada: string = '';
  mdl_message: string = '';
  usuario: string = '';
  contra: string = '';
  apellido: string = '';
  // OBTENER LISTA DE MODELS
  lista_personas: Persona[] = [];


  // RESPUESTA API
  lista_respuesta: any[] = [];
  //Lista para saber si la sesion esta activa
  lista_sesion: any[] = [];
  lista_activa: Sesion[] = [];
  vigente: string = '';
  // ALERTAS
  isAlertOpen = false;
  isAlertOpenError = false;
  alertButtons = ['OK'];


  constructor(private router: Router, private dbService: DbService, private sesionService: SesionService, private apiService: ApiService) { }

  ngOnInit() {
    // OBTIENES DATO DE TABLA PERSONA Y LAS ALMACENA EN LISTA_PERSONA
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }

    });
    // OBTINES DATOS DE LA SESION 
    this.sesionService.ObtenerSesion().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_sesion.push(data[x]);
      }
    });
  }

  registro() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['persona-crear'], parametros);
  }

  recuperar() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['recuperar'], parametros);

  }

  async ingresar() {
    this.isAlertOpenError = false;

    let data = this.apiService.personaLogin(this.mdl_usuario, this.mdl_contra);
    let respuesta = await lastValueFrom(data);

    let json = JSON.stringify(respuesta);
    let jsonProcesado = JSON.parse(json);

    for (let x = 0; x < jsonProcesado["result"].length; x++) {
      this.lista_respuesta.push(jsonProcesado["result"][x]);

      if (this.mdl_usuario != '' && this.mdl_contra != '') {
// SELECT A TABLA PERSONA
        this.dbService.personaValidar(this.mdl_usuario).then(data => {

          this.usuario = data[3];
          this.contra = data[5];

          if (this.mdl_usuario == this.usuario && this.mdl_contra == this.contra

            || this.lista_respuesta[x]["RESPUESTA"] == "LOGIN OK") {

            if (this.lista_sesion.includes(this.mdl_usuario)) {
              let parametros: NavigationExtras = {
                state: {
                  user: this.mdl_usuario
                },
                replaceUrl: true
              }
              this.vigente = '1'
              this.sesionService.sesionActual(this.vigente, this.mdl_usuario);
              this.router.navigate(['principal'], parametros);
            } else {
              let parametros: NavigationExtras = {
                state: {
                  user: this.mdl_usuario
                },
                replaceUrl: true
              }
              this.vigente = '1'
              this.sesionService.nuevaSesion(this.mdl_usuario, this.vigente);
              console.log(this.mdl_usuario);
              this.router.navigate(['principal'], parametros);
            }

          }
          else {
            if (this.lista_respuesta[x]['RESPUESTA'] == "LOGIN NOK" ||
              this.mdl_usuario != this.usuario && this.mdl_contra != this.contra) {
              this.isAlertOpen = true;
            }
          }

        });

      } else {
        this.isAlertOpen = true;
      }

    }

  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
