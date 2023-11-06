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
  mdl_message: string = '';
  usuario: string = '';
  contra: string = '';
  apellido: string = '';

  // OBTENER LISTA DE MODELS
  lista_personas: Persona[] = [];

  //Lista para saber si la sesion esta activa
  // lista_sesion: any[] = [];
  // lista_activa: Sesion[] = [];
  // vigente: string = '';

  // ALERTAS
  isAlertOpen = false;
  isAlertOpenError = false;
  alertButtons = ['OK'];


  constructor(private router: Router, 
              private dbService: DbService,
              private sesionService: SesionService, 
              private apiService: ApiService) { }

  ngOnInit() {
  }

  async ingresar() {
    this.isAlertOpen = false;
    this.isAlertOpenError = false;

    if (this.mdl_usuario != '' && this.mdl_contra != '') {
      let valApi = await this.validarUsuarioApi();
      if(valApi){

      }
    }else {
      this.isAlertOpen = true;
    }
  }

  async validarUsuarioApi(){
    let data = this.apiService.apiPersonaLogin(this.mdl_usuario, this.mdl_contra);
    let respuesta = await lastValueFrom(data); 
    let json = JSON.stringify(respuesta);
    let jsonProcesado = JSON.parse(json);

    if(jsonProcesado["result"][0]["RESPUESTA"] == "LOGIN OK"){
      return true;
    }else if(jsonProcesado["result"][0]["RESPUESTA"] == "LOGIN NOK"){
      this.isAlertOpenError = true;
      return false;
    }
    return false;
  }

  validarUsuarioDb() {
    let user = this.dbService.dbPersonaValidar(this.mdl_usuario);
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

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
