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
  apellido: string = '';

  contra: string = '';
  color: string = 'light';

  lista_personas: Persona[] = [];
  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit() {
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
        user: this.usuario,
        pass: this.contra,
        apellidol: this.apellido
      }
    }
    console.log([this.apellido]);
      console.log([this.usuario]);
      console.log([this.contra]);

    this.router.navigate(['login'], paramatros);
  }

}
