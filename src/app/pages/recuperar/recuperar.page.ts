import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
  lista_usuarios: {user: string, apellido: string, telefono: number, pass: string}[] = [];

  // alerta
  isAlertOpen = false;
  alertButtons = ['OK'];


  constructor(private router: Router) {}

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.lista_usuarios = parametros?.extras.state['lista_usuarios'];
    }
  }

  cambiar() {
    if (this.mdl_usuario == '' || this.mdl_contra == '' ) {
      this.mdl_message = "Ingrese sus datos"
      this.isAlertOpen = true;
    }else{
      if (this.lista_usuarios.length > 0){
        for(const usuario of this.lista_usuarios){
          if(usuario.user == this.mdl_usuario){

            usuario.pass = this.mdl_contra
            let paramatros : NavigationExtras = {
              replaceUrl: true,
              state: {
                lista_usuarios: this.lista_usuarios
              }
            }

            this.router.navigate(['login'], paramatros);
          }else{
            this.mdl_message = "Usuario no existente"
            this.isAlertOpen = true;
          }
        }
      }else{
        this.mdl_message = "Usuario no existente"
        this.isAlertOpen = true;
      }
    }
  }


  // ALERTA 
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
}
