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
  vigente: string = '';
  constructor(private router: Router, 
              private dbService: DbService, 
              private sesionService:SesionService) {}

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state){
      this.usuario = parametros?.extras.state['user'];
    }
  }

  logout(){
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.vigente = '0'
    this.sesionService.sesionActual(this.vigente,this.usuario)
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

}
