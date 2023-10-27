import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  //VARIABLES
  usuario: string = '';
  lista_usuarios: {user: string, apellido: string, telefono: number, pass: string}[] = [];
  contra: string = '';
  color: string = 'light';

  lista_personas: Persona[] = [];
  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {

    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state){
      this.lista_usuarios = parametros?.extras.state['lista_usuarios'];
      this.usuario = parametros?.extras.state['user'];
      this.contra = parametros?.extras.state['pass'];
    }
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })
  }

  fav(){
    this.color =  this.color == 'light'?'danger':'light'
  }

  logout(){
    let paramatros : NavigationExtras = {
      replaceUrl: true,
      state: {
        lista_usuarios: this.lista_usuarios
      }
    }
    this.router.navigate(['login'], paramatros);
  }

}
