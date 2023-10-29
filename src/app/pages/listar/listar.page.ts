import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_telefono: string = '';
  mdl_email: string = '';
  mdl_contrasena: string = '';


  usuario: string = '';
  apellido: string = '';
  contra: string = '';
  lista_personas: Persona[] = [];

  constructor(private dbService: DbService, private router:Router) { }

  ngOnInit() {
    
      let parametros = this.router.getCurrentNavigation();
      if (parametros?.extras.state) {
        this.lista_personas = parametros?.extras.state['lista_personas'];
        this.usuario = parametros?.extras.state['user'];
        this.apellido = parametros?.extras.state['apellidol'];
        this.contra = parametros?.extras.state['pass'];
        console.log([this.apellido])
        console.log([this.usuario]);
        console.log([this.contra]);
      }
      this.dbService.obtenerTodasLasPersonas().then(data => {
        for (let x = 0; x < data.length; x++) {
          this.lista_personas.push(data[x]);
        }
      })
    
  }

  volver(){
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
    this.router.navigate(['persona-crear'],paramatros);
  }

}
