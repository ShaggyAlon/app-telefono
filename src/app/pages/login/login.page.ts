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
  mdl_message: string =  '';
  
  lista_usuarios: {user: string, apellido: string, telefono: number, pass: string}[] = [];
  // OBTENER LISTA DE MODELS
  lista_personas: Persona[] = [];
  isAlertOpen = false;
  alertButtons = ['OK'];


  constructor(private router: Router,private dbService: DbService) {}

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.lista_usuarios = parametros?.extras.state['lista_usuarios'];      
    }
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })
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
        this.lista_personas = data; // Supongo que la función devuelve una lista de usuarios
  
        // Busca un usuario con las credenciales ingresadas
        const usuarioEncontrado = this.lista_personas.find(usuario => usuario.NOMBRE === this.mdl_usuario && usuario.CONTRASENA === this.mdl_contra);
  
        if (usuarioEncontrado) {
          // Credenciales válidas, navegar a la página principal
          let paramatros: NavigationExtras = {
            replaceUrl: true,
            state: {
              lista_usuarios: this.lista_usuarios,
              user: this.mdl_usuario,
              pass: this.mdl_contra
            }
          }
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
    let paramatros : NavigationExtras = {
      replaceUrl: true,
      state: {
        lista_usuarios: this.lista_usuarios
      }
    }
    this.router.navigate(['persona-crear'],paramatros)
  }
  /* RECUPERAR RECUPERAR CONTRASEÑA */
  recuperar() {
    let parametros : NavigationExtras = {
      replaceUrl:true,
      state : {
        lista_usuarios: this.lista_usuarios
      }
    };
    this.router.navigate(['recuperar'],parametros);
  }








  
/* ALERTA */
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}