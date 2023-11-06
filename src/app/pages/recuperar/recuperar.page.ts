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
  
  // alerta
  isAlertOpen = false;
  alertButtons = ['OK'];


  constructor(private dbService: DbService, 
              private router: Router) {}

  ngOnInit() {
    this.dbService.dbObtenerTodasLasPersonas().then(data => {
      this.lista_personas = data;
    });
  }

  cambiar() {
    if (this.mdl_usuario === '' || this.mdl_contra === '') {
      this.mdl_message = "Ingrese sus datos";
      this.isAlertOpen = true;
    } else {
      let usuarioEncontrado = this.lista_personas.find(usr => usr.usuario === this.mdl_usuario);
      if (usuarioEncontrado) {
        this.dbService.dbActualizarPersona(usuarioEncontrado.usuario, this.mdl_contra);
  
        let parametros: NavigationExtras = {
          replaceUrl: true,
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
      replaceUrl: true
    }
    this.router.navigate(['login'], paramatros);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
}
