import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { DbService } from 'src/app/services/db.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  //VARIABLES
  usuario: string = '';
  apellido: string = '';
  color: string = 'light';

  lista_personas: Persona[] = [];
  constructor(private router: Router,
              private sesionService:SesionService) {}

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state){
      this.usuario = parametros?.extras.state['user'];
    }
    this.cambiarEstadoSession('1');
  }

  logout(){
    this.cambiarEstadoSession('0');
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros)
  }

  cambiarContrasena(){
    let parametros: NavigationExtras = {
      state: {
        user: this.usuario
      }
    }
    this.router.navigate(['cambiar-contrasena'], parametros)
  }

  cambiarEstadoSession(vigente:string){
    this.sesionService.sesionActual(vigente,this.usuario)
  }


}
