import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  /* VARIABLES */
  mdl_usuario: string = '';
  mdl_contra: string = '';

  mdl_message: string = '';

  lista_personas: Persona[] = [];
  lista_usuarios: string[] = [];

  mdl_apellido: string = '';
  // mdl_usuario: string = '';
  // mdl_contra: string = '';
  
  // alerta
  isAlertOpen = false;
  alertButtons = ['OK'];


  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit() {
    console.log("Comenzaré a buscar usuarios")
    this.dbService.dbObtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })
  }

  cambiar() {
    if (this.mdl_usuario === '' || this.mdl_contra === '') {
      this.mdl_message = "Ingrese sus datos";
      this.isAlertOpen = true;
    } else {
      console.log("Comenzaré Usuario encontrado")
      let usuarioEncontrado = this.lista_personas.find(usuario => usuario.usuario == this.mdl_usuario);

      if (usuarioEncontrado) {
        console.log("Usuario encontrado")
        // Llama al método para actualizar la contraseña
        this.dbService.dbActualizarPersona(usuarioEncontrado.nombre, this.mdl_contra);
  
        let parametros: NavigationExtras = {
          replaceUrl: true,
          state: {
            lista_usuarios: this.lista_personas
          }
        }
        
        this.router.navigate(['login'], parametros);
      } else {
        this.mdl_message = "Usuario no existente";
        this.isAlertOpen = true;
      }
    }
  }
  
volver(){
  let paramatros : NavigationExtras = {
    replaceUrl: true,
    state: {
      // user: this.usuario,
      // pass: this.contra,
      // apellidol: this.apellido
    }
  }
  // console.log([this.apellido]);
  //   console.log([this.usuario]);
  //   console.log([this.contra]);

  this.router.navigate(['login'], paramatros);
}


  // ALERTA 
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
}
