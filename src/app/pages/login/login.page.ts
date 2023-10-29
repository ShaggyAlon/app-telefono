import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { DbService } from 'src/app/services/db.service';
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

  // lista_usuarios: {user: string, apellido: string, telefono: number, pass: string}[] = [];
  // OBTENER LISTA DE MODELS
  lista_personas: Persona[] = [];
  isAlertOpen = false;
  alertButtons = ['OK'];


  constructor(private router: Router, private dbService: DbService) { }

  ngOnInit() {
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.lista_personas = parametros?.extras.state['lista_personas'];
      this.usuario = parametros?.extras.state['user'];
      this.apellido = parametros?.extras.state['apellidol'];
      this.contra = parametros?.extras.state['pass'];
      // console.log([this.apellido])
      // console.log([this.usuario]);
      // console.log([this.contra]);
      console.log([this.lista_personas])
    }

  }

  // BOTON NAVEGAR
  ingresar() {
    console.log("Entre click");

    if (this.mdl_usuario === '' || this.mdl_contra === '') {
      this.mdl_message = "Ingrese sus credenciales";
      this.isAlertOpen = true;
    } else {
      // Llamada a la función que obtiene los datos de la base de datos
      this.dbService.obtenerTodasLasPersonas().then(data => {
        this.lista_personas = data;

        // Busca un usuario con las credenciales ingresadas
        const usuarioEncontrado = this.lista_personas.find(usuario => usuario.NOMBRE === this.mdl_usuario
          && usuario.CONTRASENA === this.mdl_contra);

        if (usuarioEncontrado) {
          // Credenciales válidas, navegar a la página principal
          let paramatros: NavigationExtras = {
            replaceUrl: true,
            state: {

              user: this.mdl_usuario,
              pass: this.mdl_contra,
              apellidol: this.apellido
              
            }
          }
          console.log(this.apellido);
          console.log(this.mdl_usuario);
          this.router.navigate(['principal'], paramatros);
        } else {
          // Credenciales inválidas
          this.mdl_message = "Credenciales inválidas";
          this.isAlertOpen = true;
        }
      });
    }
  }


  /* METODO REGISTRO */
  registro() {
    let paramatros: NavigationExtras = {
      replaceUrl: true,
      state: {
          user: this.usuario,
          pass: this.contra,
          apellidol: this.apellido
        }
    }
    console.log([this.apellido]);
    console.log([this.usuario]);
    console.log([this.contra]);
    this.router.navigate(['persona-crear'], paramatros)
  }
  /* RECUPERAR RECUPERAR CONTRASEÑA */
  recuperar() {
    let paramatros : NavigationExtras = {
      replaceUrl: true,
      state: {
        user: this.usuario,
        pass: this.contra,
        apellidol: this.apellido
      }
    }
    console.log([this.apellido]);
      console.log([this.usuario]);
      console.log([this.contra]);
  
      this.router.navigate(['recuperar'], paramatros);
  }


  

  /* ALERTA */
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}