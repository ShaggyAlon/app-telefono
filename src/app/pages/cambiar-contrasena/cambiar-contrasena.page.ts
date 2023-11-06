import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { lastValueFrom } from 'rxjs';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {


  /* VARIABLES */
  mdl_usuario: string = '';
  mdl_contra: string = '';
  mdl_new_contra: string = '';
  mdl_message: string = '';
  usuario: string = '';

  // alerta
  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private dbService: DbService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.usuario = parametros?.extras.state['user'];
    }
  }

  async cambiar() {
    if (this.mdl_usuario === '' || this.mdl_contra === '' || this.mdl_new_contra === '') {
      this.mdl_message = "Ingrese sus datos";
      this.isAlertOpen = true;
    } else {
      let resApi = await this.cambiarContrasenaApi();
      if (resApi) {
        let resDb = this.cambiarContrasenaDb(this.mdl_usuario, this.mdl_new_contra);
        if (resDb) {
          this.mdl_message = "Contraseña cambiada correctamente";
          this.isAlertOpen = true;
          this.router.navigate(['login']);
        }
      }
    }
  }

  async cambiarContrasenaApi() {
    let data = this.apiService.apiPersonaModificarContrasena(this.mdl_usuario, this.mdl_contra, this.mdl_new_contra);
    let respuesta = await lastValueFrom(data);
    let json = JSON.stringify(respuesta);
    let jsonProcesado = JSON.parse(json);

    if (jsonProcesado.result[0].RESPUESTA == "OK") {
      this.mdl_message = "Contraseña cambiada correctamente";
      this.isAlertOpen = true;
      return true;
    } else if (jsonProcesado.result == "ERR01") {
      this.mdl_message = "Credenciales incorrectas";
      this.isAlertOpen = true;
      return false;
    }
    return false;
  }

  cambiarContrasenaDb(usuario: string, new_contra: string) {
    let res = this.dbService.dbActualizarPersona(usuario, new_contra);
    return res;
  }

  volver(){
    let paramatros : NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['principal'], paramatros);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
