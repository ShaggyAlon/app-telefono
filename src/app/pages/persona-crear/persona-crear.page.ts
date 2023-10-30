import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

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


  constructor(private dbService: DbService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {

    // let parametros = this.router.getCurrentNavigation();
    // if (parametros?.extras.state) {
    //   this.lista_personas = parametros?.extras.state['lista_personas'];
    //   this.usuario = parametros?.extras.state['user'];
    //   this.apellido = parametros?.extras.state['apellidol'];
    //   this.contra = parametros?.extras.state['pass'];
    //   // console.log([this.apellido])
    //   // console.log([this.usuario]);
    //   // console.log([this.contra]);
    //   console.log([this.lista_personas])
    // }
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })

  }

  async almacenarPersona() {
    // Variables para no tener duplication
    let usuarioExistente = false;
    let emailExistente = false;
    // VALIDA SI EL CORREO O EL NOMBRE EXISTE
    for (let i = 0; i < this.lista_personas.length; i++) {
      if (this.lista_personas[i].USUARIO === this.mdl_usuario ||this.lista_personas[i].EMAIL === this.mdl_email ) {
        usuarioExistente = true;
      }
    }
    let parametros: NavigationExtras = {
      replaceUrl: true
    }

    let data = this.apiService.personaAlmacenar(
      this.mdl_usuario,
      this.mdl_email,
      this.mdl_contrasena,
      this.mdl_nombre,
      this.mdl_apellido
    );
    console.log('buena');
    let respuesta = await lastValueFrom(data);
    // OBTENER REASPUESTA DE API
    let json = JSON.stringify(respuesta);
    let jsonProcesado = JSON.parse(json);

    for (let x = 0; x < jsonProcesado["result"].length; x++) {
      this.lista_respuesta.push(jsonProcesado["result"][x]);
console.log('pasate por aqui 2')
      if (this.mdl_usuario != '' &&
        this.mdl_email != '' &&
        this.mdl_contrasena != '' &&
        this.mdl_nombre != '' &&
        this.mdl_apellido != '') {

        if (!usuarioExistente && !emailExistente &&
          this.lista_respuesta[x]["RESPUESTA"] == "OK") {

          this.dbService.almacenarPersona(
            this.mdl_nombre,
            this.mdl_apellido,
            this.mdl_email,
            this.mdl_usuario,
            this.mdl_contrasena
          );
            console.log('pasaste por aqui')
          this.router.navigate(['login'], parametros);

        } else {
          console.log('wena chorixo')
          this.mdl_usuario = '',
          this.mdl_email = '';
          this.mdl_contrasena = '';
          this.isAlertOpen = true;
          if (this.lista_respuesta[x]["RESPUESTA"] == "ERR01" || usuarioExistente) {
            this.isAlertOpenDuplicado = true;
          } if (this.lista_respuesta[x]["RESPUESTA"] == "ERR02" || emailExistente) {
            this.isAlertOpenEmail = true;
          }
          
        }

      } else {
        console.log('caiste aca maldito')
        this.isAlertOpen = true;
      }

    }

  }


  volver() {
    let paramatros: NavigationExtras = {
      replaceUrl: true,
    }
    this.router.navigate(['login'], paramatros);
  }
  // NO FUNCIONA BIEN
  // irListarPersonas() {
  //   let paramatros: NavigationExtras = {
  //     replaceUrl: true,
  //     state: {

  //       user: this.mdl_nombre,
  //       pass: this.mdl_contrasena,
  //       apellidol: this.mdl_apellido
  //     }
  //   }
  //   this.router.navigate(['listar'], paramatros);
  // }
  /* ALERTA */
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
