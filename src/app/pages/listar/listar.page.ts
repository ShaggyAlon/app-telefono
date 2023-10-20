import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  lista_personas: Persona[] = [];

  constructor(private dbService: DbService, private router:Router) { }

  ngOnInit() {
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })
  }

  volver(){
    this.router.navigate(['persona-crear']);
  }

}
