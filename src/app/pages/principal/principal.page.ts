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
  nombre: string = '';
  contra: string = '';
  color: string = 'light';

  lista_personas: Persona[] = [];
  vigente: string = '';
  constructor(private router: Router, private dbService: DbService, private sesionService:SesionService) {}

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state){
      this.usuario = parametros?.extras.state['user'];
    }
    this.dbService.personaValidar(this.usuario).then(data => {
      console.log('a lo maldito')
      this.nombre =  data[0]; 
      this.apellido = data [1];
    });
  }

  fav(){
    this.color =  this.color == 'light'?'danger':'light'
  }

  logout(){
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.vigente = '0'
    this.sesionService.sesionActual(this.vigente,this.usuario)
    this.router.navigate(['login'], parametros)
  }

}
